import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  DefaultScope,
  Default,
  AllowNull
} from "sequelize-typescript";
import { DocumentUser } from "./document-user.model";
import { User } from "./user.model";
import { Comment } from "./comment.model";
import { Status } from "./status.model";

@DefaultScope(() => ({
  include: [
    {
      model: DocumentUser,
      include: [
        {
          model: User,
          attributes: ["email"]
        }
      ]
    }
  ]
}))
@Table({ tableName: "document", underscored: true })
class Document extends Model {
  @AllowNull(false)
  @Default("[Untitled]")
  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.STRING)
  content!: string;

  @ForeignKey(() => User)
  userId!: number;

  @ForeignKey(() => Status)
  name!: string;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => DocumentUser, {
    onDelete: "CASCADE"
  })
  users!: Array<DocumentUser>;

  @HasMany(() => Comment, {
    onDelete: "CASCADE"
  })
  comments!: Array<Comment>;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  isPublic!: boolean;
}

export { Document };
