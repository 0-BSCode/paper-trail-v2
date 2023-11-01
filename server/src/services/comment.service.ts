import { Comment } from "../db/models/comment.model";
import { User } from "../db/models/user.model";
import { Role } from "../db/models/role.model";
import { DocumentUser } from "../db/models/document-user.model";
import { Document } from "../db/models/document.model";
import RoleEnum from "../types/enums/role-enum";

class CommentService {
  public createComment = async (userId: number, documentId: number, content: string): Promise<Comment | null> => {
    // We check if the userId is associated with a document
    const targetDocument = await Document.findByPk(documentId);
    const commentingUser = await User.findByPk(userId, { include: [Role, DocumentUser] });

    if (targetDocument === null || commentingUser === null) {
      // No comment is created
      return null;
    }

    const isOwner = targetDocument.userId === userId;

    const isPermittedToEdit = commentingUser.sharedDocuments.some(
      (d) => targetDocument.id === d.documentId && d.permission === "EDIT"
    );

    const isCisco = commentingUser.roles.some(
      (r) => r.name === RoleEnum.CISCO_MEMBER || r.name === RoleEnum.CISCO_ADMIN
    );

    if (!isOwner && !isPermittedToEdit && !isCisco) {
      // No comment is created
      return null;
    }

    // So, commentingUser could be: an owner, has EDIT permission, or is a CISCO_MEMBER or CISCO_ADMIN
    const newComment: Comment = await Comment.create({
      userId,
      documentId,
      content
    });

    return newComment;
  };

  public getComments = async (documentId: number): Promise<Comment[] | null> => {
    const document = await Document.findByPk(documentId, { include: [Comment] });

    if (document === null || document.comments.length === 0) {
      // Document does not exist or it does not have any comments
      return null;
    }

    return document.comments;
  };
}

export default new CommentService();
