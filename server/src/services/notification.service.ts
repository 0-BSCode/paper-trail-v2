import { Notification } from "../db/models/notification.model";
import { User } from "../db/models/user.model";
import { Document } from "../db/models/document.model";
import { Comment } from "../db/models/comment.model";

class NotificationService {
  public getNotifications = async (userId: number): Promise<Notification[]> => {
    const notifications = await Notification.findAll({ where: { userId } });

    if (!notifications || notifications.length === 0) {
      return [];
    }

    return notifications;
  };

  /**
   * Notifies a student (ticket owner) of a change in ticket status.
   */
  public notifyStatusChange = async (userId: number, documentId: number): Promise<Notification | null> => {
    // We check if the userId is associated with a document
    const targetDocument = await Document.findByPk(documentId);
    const userToNotify = await User.findByPk(userId);

    if (targetDocument === null || userToNotify === null) {
      // No notification is created
      return null;
    }

    const isOwner = targetDocument.userId === userId;

    if (!isOwner) {
      // No notification is created
      return null;
    }

    const NOTIFICATION_MESSAGE = `Your ticket "${targetDocument.title}" had its status updated to ${targetDocument.status}`;
    const newNotification: Notification = await Notification.create({
      userId,
      documentId,
      message: NOTIFICATION_MESSAGE
    });

    return newNotification;
  };

  public notifyNewCommentByAnotherUser = async (commentId: number): Promise<Notification | null> => {
    const newComment = await Comment.findByPk(commentId, { include: [Document, User] });

    // No notification should be created with non-existent comments.
    if (newComment === undefined || newComment === null) {
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

    const NOTIFICATION_MESSAGE = `Your ticket "${newComment.document.title}" has a new comment from ${newComment.user.email}: "${newComment.content}".`;
    const newNotification: Notification = await Notification.create({
      userId: newComment.document.userId,
      documentId: newComment.document.id,
      message: NOTIFICATION_MESSAGE
    });

    return newNotification;
  };
}

export default new NotificationService();
