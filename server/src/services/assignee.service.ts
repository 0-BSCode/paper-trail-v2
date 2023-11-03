import { User } from "../db/models/user.model";
import { DocumentAssignee } from "../db/models/document-assignee.model";
import { Document } from "../db/models/document.model";
import RoleEnum from "../types/enums/role-enum";

class AssigneeService {
  public updateAssignee = async (userId: number, documentId: number): Promise<DocumentAssignee | null> => {
    // Check if documentId and userId exist in database
    const targetDocument = await Document.findByPk(documentId);
    const targetUser = await User.findByPk(userId);

    if (targetDocument === null || targetUser === null) {
      // No user was assigned to document
      return null;
    }

    const isCisco = targetUser.roles.some((r) => r.name === RoleEnum.CISCO_MEMBER || r.name === RoleEnum.CISCO_ADMIN);

    if (!isCisco) {
      // Disallows non-Cisco users from being assigned to document
      return null;
    }

    // So, commentingUser could be: an owner, has EDIT permission, or is a CISCO_MEMBER or CISCO_ADMIN
    const assignee: DocumentAssignee = await DocumentAssignee.create({
      userId,
      documentId
    });

    return assignee;
  };

  public getAssignee = async (documentId: number) => {
    const document = await Document.findByPk(documentId, { include: [{ model: DocumentAssignee, as: "assignee" }] });

    if (!document) {
      return null;
    }

    return document.assignee;
  };

  public getDocumentsOfAssignee = async (userId: number) => {
    const documents = await DocumentAssignee.findAll({ where: { userId: userId } });

    if (!documents) {
      return null;
    }

    return documents;
  };
}

export default new AssigneeService();
