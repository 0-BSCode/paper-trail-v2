import { Table, Model, ForeignKey, BelongsTo, Column } from "sequelize-typescript";
import { User } from "./user.model";
import { Document } from "./document.model";

@Table({ tableName: "document_assignee", underscored: true })
class DocumentAssignee extends Model {
  @BelongsTo(() => User)
  assignee!: User;

  @ForeignKey(() => User)
  @Column({ primaryKey: true })
  assigneeId!: number;

  @BelongsTo(() => Document)
  document!: Document;

  @ForeignKey(() => Document)
  @Column({ primaryKey: true })
  documentId!: number;
}

export { DocumentAssignee };
