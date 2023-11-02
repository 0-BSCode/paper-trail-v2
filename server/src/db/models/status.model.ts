import { Table, Column, Model, DataType, AllowNull, BelongsTo, ForeignKey } from "sequelize-typescript";
import StatusEnum from "../../types/enums/status-enum";
import { Document } from "./document.model";

@Table({ tableName: "comment", underscored: true })
class Status extends Model {
  @AllowNull(false)
  @Column(DataType.ENUM("DRAFT", "REVIEW_REQUESTED", "REVIEW", "CHANGES_REQUESTED", "RAISED", "RESOLVED"))
  name!: StatusEnum;

  @ForeignKey(() => Document)
  @AllowNull(false)
  @Column(DataType.NUMBER)
  documentId!: number;

  @BelongsTo(() => Document)
  document!: Document;

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string;
}

export { Status };
