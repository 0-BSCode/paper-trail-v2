import { Table, Column, Model, DataType, ForeignKey, AllowNull, BelongsTo } from "sequelize-typescript";
import { Document } from "./document.model";
import { User } from "./user.model";

@Table({ tableName: "comment", underscored: true })
class Comment extends Model {
  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.NUMBER)
  userId!: number;

  @BelongsTo(() => Document)
  document!: Document;

  @ForeignKey(() => Document)
  @AllowNull(false)
  @Column(DataType.NUMBER)
  documentId!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  content!: string;
}

export { Comment };
