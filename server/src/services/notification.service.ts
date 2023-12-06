import { Notification } from "../db/models/notification.model";
import { User } from "../db/models/user.model";
import { Document } from "../db/models/document.model";
import { Comment } from "../db/models/comment.model";
import { Role } from "../db/models/role.model";
import RoleEnum from "../types/enums/role-enum";
import { Op } from "sequelize";

class NotificationService {
  private createNotification = async (
    receiverId: number,
    senderId: number,
    documentId: number,
    message: string
  ): Promise<Notification> => {
    const newNotification: Notification = await Notification.create({
      receiverId,
      senderId,
      documentId,
      message
    });

    return newNotification;
  };

  public getNotifications = async (receiverId: number): Promise<Notification[]> => {
    const notifications = await Notification.findAll({
      where: { receiverId },
      include: [
        {
          model: User,
          as: "receiver",
          attributes: { exclude: ["password", "passwordResetToken", "verificationToken", "createdAt", "updatedAt"] }
        },
        {
          model: User,
          as: "sender",
          attributes: { exclude: ["password", "passwordResetToken", "verificationToken", "createdAt", "updatedAt"] }
        },
        { model: Document, attributes: ["title", "id", "status"] }
      ]
    });

    return notifications;
  };

  /**
   * Notifies a student (ticket owner) of a change in ticket status.
   */
  public notifyStatusChange = async (
    receiverId: number,
    senderId: number,
    documentId: number
  ): Promise<Notification | null> => {
    const convertToTitleCase = (str: string): string => {
      return str.replace(/_/g, " ").replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    };

    // We check if the userId is associated with a document
    const targetDocument = await Document.findByPk(documentId);
    const userToNotify = await User.findByPk(receiverId);

    if (targetDocument === null || userToNotify === null) {
      // No notification is created
      return null;
    }

    const isOwner = targetDocument.userId === receiverId;

    if (!isOwner) {
      // No notification is created
      return null;
    }

    const newNotification: Notification = await this.createNotification(
      receiverId,
      senderId,
      documentId,
      `Your ticket "${targetDocument.title}" had its status updated to ${convertToTitleCase(targetDocument.status)}.`
    );

    return newNotification;
  };

  /**
   * Notifies a student when a new comment is created by other users on their ticket.
   */
  public notifyNewCommentByAnotherUser = async (commentId: number): Promise<Notification | null> => {
    const newComment = await Comment.findByPk(commentId, { include: [Document, User] });

    // No notification should be created with non-existent comments.
    if (!newComment) {
      return null;
    }

    // No notification should be created with non-existent document or users.
    if (!newComment.document === undefined || !newComment.document === null) {
      return null;
    }

    if (!newComment.user === undefined || !newComment.user === null) {
      return null;
    }

    // The owner should not be notified of their own comments.
    if (newComment.document.userId === newComment.userId) {
      return null;
    }

    const newNotification: Notification = await this.createNotification(
      newComment.document.userId,
      newComment.userId,
      newComment.document.id,
      `Your ticket "${newComment.document.title}" has a new comment from ${newComment.user.email}: "${newComment.content}".`
    );

    return newNotification;
  };

  /**
   * Notifies every Cisco member about a newly created ticket.
   */
  public notifyCiscoNewlyCreatedTicket = async (newDocumentId: number): Promise<Notification[] | null> => {
    const targetDocument = await Document.findByPk(newDocumentId);

    if (targetDocument === undefined || targetDocument === null) {
      return null;
    }

    // Get the Cisco Member userIds to send notifications to
    const ciscoRolesRaw = await Role.findAll({
      where: { [Op.or]: [{ name: RoleEnum.CISCO_MEMBER }, { name: RoleEnum.CISCO_ADMIN }] }
    });
    const ciscoRoleNumbers = ciscoRolesRaw.map((r) => r.id);
    const rawMembers = await User.findAll({
      include: [Role]
    });
    const members = rawMembers.map((m) => m.toJSON());
    const ciscoMembers = members.filter((m) => m.roles.some((r: Role) => ciscoRoleNumbers.includes(r.id)));
    const ciscoMemberUserIds = ciscoMembers.map((m) => m.id);

    // Notify each Cisco member
    const newNotifications: Notification[] = [];
    for (let i = 0; i < ciscoMemberUserIds.length; i++) {
      const createdNotification = await this.createNotification(
        ciscoMemberUserIds[i],
        targetDocument.userId,
        targetDocument.id,
        `A new Ticket #${targetDocument.id} was created: "${targetDocument.title}".`
      );
      newNotifications.push(createdNotification);
    }

    return newNotifications;
  };

  /**
   * Notifies the Cisco user assigned to a ticket about a new comment.
   */
  public notifyAssigneeTicketComment = async (commentId: number) => {
    const newComment = await Comment.findByPk(commentId, { include: [Document, User] });

    // No notification should be created about non-existed comments or documents.
    if (!newComment) {
      return null;
    }

    const document = newComment.document;

    if (!document === undefined) {
      return null;
    }

    // No notification should be created on documents with no assignee.
    if (!document.assigneeId) {
      return null;
    }

    // No notification should be created when the assignee themself comments.
    if (document.assigneeId === newComment.userId) {
      return null;
    }

    const newNotification = await this.createNotification(
      document.assigneeId,
      newComment.userId,
      document.id,
      `Ticket #${document.id}: "${document.title}" assigned to you has a new comment: "${newComment.content}"`
    );

    return newNotification;
  };

  /**
   * Notifies a ticket owner when a new user is assigned to their ticket.
   */
  public notifyOwnerNewAssignee = async (documentId: number, assigneeId: number) => {
    const targetDocument = await Document.findByPk(documentId);

    if (!targetDocument) {
      return null;
    }

    const assignee = await User.findByPk(assigneeId);

    if (!assignee) {
      return null;
    }

    const newNotification = await this.createNotification(
      targetDocument.userId,
      assigneeId,
      targetDocument.id,
      `Your ticket "${targetDocument.title}" has a new assignee: "${assignee.email}".`
    );

    return newNotification;
  };
}

export default new NotificationService();
