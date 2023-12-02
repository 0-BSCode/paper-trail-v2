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
import StatusEnum from "../../types/enums/status-enum";

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

  @BelongsTo(() => User, {
    foreignKey: "userId",
    as: "owner"
  })
  owner!: User;

  @HasMany(() => DocumentUser, {
    onDelete: "CASCADE"
  })
  users!: Array<DocumentUser>;

  @AllowNull(true)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  assigneeId!: number;

  @BelongsTo(() => User, {
    foreignKey: "assigneeId",
    as: "assignee"
  })
  assignee!: User;

  @HasMany(() => Comment, {
    onDelete: "CASCADE"
  })
  comments!: Array<Comment>;

  @AllowNull(false)
  @Default(StatusEnum.DRAFT)
  @Column(DataType.ENUM("DRAFT", "REVIEW_REQUESTED", "REVIEW", "CHANGES_REQUESTED", "RAISED", "RESOLVED"))
  status!: StatusEnum;

  @AllowNull(false)
  @Default(false)
  @Column(DataType.BOOLEAN)
  isPublic!: boolean;
}

export { Document };
