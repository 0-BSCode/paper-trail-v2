import { Comment } from "../db/models/comment.model";
import { User } from "../db/models/user.model";
import { Role } from "../db/models/role.model";
import { DocumentUser } from "../db/models/document-user.model";
import { Document } from "../db/models/document.model";
import documentService from "./document.service";

class CommentService {
  public createComment = async (userId: number, documentId: number, content: string): Promise<Comment | null> => {
    // we check if the userId is associated with a document
    const targetDocument = await documentService.findDocumentById(documentId, userId);
    const commentingUser = await User.findByPk(userId, { include: [Role, DocumentUser] });

    if (targetDocument === null || commentingUser === null) {
      // no comment is created
      return null;
    }

    const doesNotHavePermissionToEdit =
      commentingUser?.sharedDocuments.find((d) => targetDocument.id === d.documentId && d.permission === "EDIT") ===
      undefined;

    const isNotAdminOrSuperAdmin =
      commentingUser?.roles.find((r) => r.name === "ADMIN" || r.name === "SUPERADMIN") === undefined;

    if (doesNotHavePermissionToEdit && isNotAdminOrSuperAdmin) {
      // no comment is created
      return null;
    }

    // insert the new comment if the association exists
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
      // document does not exist or it does not have any comments
      return null;
    }

    return document.comments;
  };
}

export default new CommentService();
