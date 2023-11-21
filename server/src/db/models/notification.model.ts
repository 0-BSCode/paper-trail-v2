import { Table, Column, Model, DataType, ForeignKey, AllowNull, BelongsTo, Default } from "sequelize-typescript";
import { Document } from "./document.model";
import { User } from "./user.model";

@Table({ tableName: "notification", underscored: true })
class Notification extends Model {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.NUMBER)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Document)
  @AllowNull(true)
  @Column(DataType.NUMBER)
  documentId!: number;

  @BelongsTo(() => Document)
  document!: Document;

  @AllowNull(false)
  @Column(DataType.STRING)
  message!: string;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  isRead!: boolean;
}

export { Notification };
