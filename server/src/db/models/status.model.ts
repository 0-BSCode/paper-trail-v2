import { Table, Column, Model, DataType, AllowNull, BelongsTo } from "sequelize-typescript";
import { Document } from "./document.model";

@Table({ tableName: "comment", underscored: true })
class Status extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @BelongsTo(() => Document)
  document!: Document;

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string;
}

export { Status };
