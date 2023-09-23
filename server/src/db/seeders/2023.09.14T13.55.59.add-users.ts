import { Seeder } from "../../config/db.config";
import RoleEnum from "../../types/enums/role-enum";

const seedUsers = [
  {
    id: 1,
    email: "alice@gmail.com",
    password: "12345",
    is_verified: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 2,
    email: "bob@gmail.com",
    password: "12345",
    is_verified: true,
    created_at: new Date(),
    updated_at: new Date()
  }
];

const seedRoles = [
  { id: 1, name: RoleEnum.ADMIN },
  { id: 2, name: RoleEnum.SUPERADMIN }
];

const seedUserRoles = [
  { user_id: 1, role_id: 1, created_at: new Date(), updated_at: new Date() },
  { user_id: 2, role_id: 2, created_at: new Date(), updated_at: new Date() }
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert("user", seedUsers);
  await sequelize.getQueryInterface().bulkInsert("role", seedRoles);
  await sequelize.getQueryInterface().bulkInsert("user_role", seedUserRoles);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("user", { id: seedUsers.map((u) => u.id) });
  await sequelize.getQueryInterface().bulkDelete("role", { id: seedRoles.map((u) => u.id) });
  await sequelize
    .getQueryInterface()
    .bulkDelete("user_role", {
      user_id: seedUserRoles.map((ur) => ur.user_id),
      role_id: seedUserRoles.map((ur) => ur.role_id)
    });
};
