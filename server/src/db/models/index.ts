import sequelize from "../../config/db.config";
import { User } from "./user.model";
import { RefreshToken } from "./refresh-token.model";
import { Role } from "./role.model";
import { UserRole } from "./user-role.model";
import { Document } from "./document.model";
import { DocumentUser } from "./document-user.model";

export const setupDb = (): void => {
  sequelize.addModels([User, RefreshToken, Role, UserRole, Document, DocumentUser]);
};
