import { Op } from "sequelize";
import { DocumentUser } from "../db/models/document-user.model";
import { Document } from "../db/models/document.model";
import { User } from "../db/models/user.model";
import { Role } from "../db/models/role.model";
import RoleEnum from "../types/enums/role-enum";

class DocumentService {
  public findDocumentById = async (id: number, userId: number) => {
    const user = await User.findByPk(userId, { include: [Role, DocumentUser] });

    if (!user) return null;

    let document;
    const isCisco = user.roles.some((r) => r.name === RoleEnum.CISCO_MEMBER || r.name === RoleEnum.CISCO_ADMIN);

    // TODO: Remove userId from document (owner field should already be giving id)
    // Give access to cisco member/admin
    if (isCisco) {
      document = await Document.findOne({
        where: {
          id: id
        },
        include: [
          {
            model: User,
            as: "owner",
            attributes: ["id", "fullName", "email"]
          }
        ]
      });

      if (!document) return null;
    } else {
      // Give access to owner
      document = await Document.findOne({
        where: {
          [Op.or]: [
            {
              id: id,
              userId: userId
            },
            {
              id: id,
              isPublic: true,
              userId: userId
            }
          ]
        },
        include: [
          {
            model: User,
            as: "owner",
            attributes: ["id", "fullName", "email"]
          }
        ]
      });

      if (!document) {
        // Give access to other document users
        const sharedDocument = await DocumentUser.findOne({
          where: {
            userId: userId,
            documentId: id
          },
          include: {
            model: Document,
            include: [
              {
                model: User,
                as: "owner",
                attributes: ["id", "fullName", "email"]
              }
            ]
          }
        });

        if (!sharedDocument) return null;

        document = sharedDocument.document;
      }
    }
    return document;
  };
}

export default new DocumentService();
