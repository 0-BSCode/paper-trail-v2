import { User } from "../db/models/user.model";
import { Document } from "../db/models/document.model";
import RoleEnum from "../types/enums/role-enum";
import { Role } from "../db/models/role.model";
import { DocumentUser } from "../db/models/document-user.model";

class AssigneeService {
  public updateAssignee = async (assigneeId: number, documentId: number) => {
    // Check if documentId and userId exist in database
    const targetDocument = await Document.findOne({
      where: {
        id: documentId
      }
    });
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

    if (assigneeId !== undefined && assigneeId !== null) targetDocument.assigneeId = assigneeId;
    await targetDocument.save();
  };

  public findAssigneeById = async (documentId: number) => {
    const document = await Document.findOne({
      where: {
        id: documentId
      }
    });

    if (!document) {
      return null;
    }
    const assignee = await User.findByPk(document?.assigneeId);

    return assignee;
  };

  public getDocumentsOfAssignee = async (assigneeId: number) => {
    const documents = await Document.findAll({ where: { assigneeId } });

    if (!documents) {
      return null;
    }

    return documents;
  };
}

export default new AssigneeService();
