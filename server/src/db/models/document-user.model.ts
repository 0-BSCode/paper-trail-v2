import { Table, Model, ForeignKey, BelongsTo, Column, DataType, AllowNull, Default } from "sequelize-typescript";
import { User } from "./user.model";
import { Document } from "./document.model";
import PermissionEnum from "../../types/enums/permission-enum";

@Table({ tableName: "document_user", underscored: true })
class DocumentUser extends Model {
  @AllowNull(false)
  @Default(PermissionEnum.VIEW)
  @Column(DataType.ENUM("VIEW", "EDIT"))
  permission!: PermissionEnum;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => User)
  @Column({ primaryKey: true })
  userId!: number;

  @BelongsTo(() => Document)
  document!: Document;

  @ForeignKey(() => Document)
  @Column({ primaryKey: true })
  documentId!: number;
}

export { DocumentUser };
