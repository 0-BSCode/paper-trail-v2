import { Table, Column, Model, DataType, AllowNull } from "sequelize-typescript";
import StatusEnum from "../../types/enums/status-enum";

@Table({ tableName: "comment", underscored: true })
class Status extends Model {
  @AllowNull(false)
  @Column(DataType.ENUM("DRAFT", "REVIEW_REQUESTED", "REVIEW", "CHANGES_REQUESTED", "RAISED", "RESOLVED"))
  name!: StatusEnum;

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string;
}

export { Status };
