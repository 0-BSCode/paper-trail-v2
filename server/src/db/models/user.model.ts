import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsToMany,
  Scopes,
  Unique,
  AllowNull,
  Default
} from "sequelize-typescript";
import { DocumentUser } from "./document-user.model";
import { RefreshToken } from "./refresh-token.model";
import { Role } from "./role.model";
import { UserRole } from "./user-role.model";

@Scopes(() => ({
  withRoles: {
    include: [
      {
        model: UserRole,
        attributes: ["createdAt", "updatedAt"],
        include: [Role]
      }
    ]
  }
}))
@Table({ tableName: "user", underscored: true })
class User extends Model {
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  fullName!: string;

  @AllowNull(false)
  @Default("")
  @Column(DataType.STRING)
  contactNumber!: string;

  @AllowNull(false)
  @Default("")
  @Column(DataType.STRING)
  courseAndYear!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  studentIdNumber!: string;

  @AllowNull(false)
  @Default(0)
  @Column(DataType.BOOLEAN)
  isVerified!: boolean;

  @Column(DataType.STRING)
  verificationToken!: string;

  @Column(DataType.STRING)
  passwordResetToken!: string;

  @HasMany(() => RefreshToken, {
    onDelete: "CASCADE"
  })
  refreshTokens!: Array<RefreshToken>;

  @BelongsToMany(() => Role, {
    through: {
      model: () => UserRole
    }
  })
  roles!: Array<Role>;

  @HasMany(() => UserRole, {
    onDelete: "CASCADE"
  })
  userRoles!: Array<UserRole>;

  @HasMany(() => DocumentUser, {
    onDelete: "CASCADE"
  })
  sharedDocuments!: Array<DocumentUser>;
}

export { User };
