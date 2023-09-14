import { Table, Model, ForeignKey, BelongsTo, PrimaryKey, Column, DataType } from "sequelize-typescript";
import { Role } from "./role.model";
import { User } from "./user.model";

@Table({ tableName: "user_role", underscored: true })
class UserRole extends Model {
  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => User)
  @Column({ primaryKey: true })
  userId!: number;

  @BelongsTo(() => Role)
  role!: Role;

  @ForeignKey(() => Role)
  @Column({ primaryKey: true })
  roleId!: number;
}

export { UserRole };
