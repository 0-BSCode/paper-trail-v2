import { Table, Column, Model, DataType, AllowNull, BelongsTo } from "sequelize-typescript";
import { Document } from "./document.model";
import StatusEnum from "../../types/enums/status-enum";

@Table({ tableName: "comment", underscored: true })
class Status extends Model {
  @AllowNull(false)
  @Column(DataType.ENUM("DRAFT", "REVIEW_REQUESTED", "REVIEW", "CHANGES_REQUESTED", "RAISED", "RESOLVED"))
  name!: StatusEnum;

  @BelongsTo(() => Document)
  document!: Document;

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string;
}

export { Status };
