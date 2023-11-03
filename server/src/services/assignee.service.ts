import { User } from "../db/models/user.model";
import { DocumentAssignee } from "../db/models/document-assignee.model";
import { Document } from "../db/models/document.model";
import RoleEnum from "../types/enums/role-enum";
import { Role } from "../db/models/role.model";
import { DocumentUser } from "../db/models/document-user.model";

class AssigneeService {
  public updateAssignee = async (assigneeId: number, documentId: number): Promise<DocumentAssignee | null> => {
    // Check if documentId and userId exist in database
    const targetDocument = await Document.findByPk(documentId);
    const targetUser = await User.findByPk(assigneeId, { include: [Role, DocumentUser] });

    console.log(targetDocument);

    if (targetDocument === null || targetUser === null) {
      // No user was assigned to document
      return null;
    }

    const isCisco = targetUser.roles.some((r) => r.name === RoleEnum.CISCO_MEMBER || r.name === RoleEnum.CISCO_ADMIN);

    if (!isCisco) {
      // Disallows non-Cisco users from being assigned to document
      return null;
    }

    const assignee: DocumentAssignee = await DocumentAssignee.create({
      assigneeId,
      documentId
    });

    return assignee;
  };

  public findAssigneeById = async (documentId: number) => {
    const document = await Document.findByPk(documentId, { include: [{ model: DocumentAssignee, as: "assignee" }] });

    if (!document) {
      return null;
    }

    return document.assignee;
  };

  public getDocumentsOfAssignee = async (assigneeId: number) => {
    const documents = await DocumentAssignee.findAll({ where: { assigneeId } });

    if (!documents) {
      return null;
    }

    return documents;
  };
}

export default new AssigneeService();
