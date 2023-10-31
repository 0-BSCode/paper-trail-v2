import { Seeder } from "../../config/db.config";
import RoleEnum from "../../types/enums/role-enum";

const seedRoles = [
  { id: 1, name: RoleEnum.STUDENT },
  { id: 2, name: RoleEnum.CISCO_MEMBER },
  { id: 3, name: RoleEnum.CISCO_ADMIN }
];

const seedUserRoles = [
  { user_id: 1, role_id: 3, created_at: new Date(), updated_at: new Date() },
  { user_id: 2, role_id: 3, created_at: new Date(), updated_at: new Date() },
  { user_id: 3, role_id: 3, created_at: new Date(), updated_at: new Date() },
  { user_id: 4, role_id: 3, created_at: new Date(), updated_at: new Date() },
  { user_id: 5, role_id: 1, created_at: new Date(), updated_at: new Date() },
  { user_id: 6, role_id: 1, created_at: new Date(), updated_at: new Date() },
  { user_id: 7, role_id: 2, created_at: new Date(), updated_at: new Date() }
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert("role", seedRoles);
  await sequelize.getQueryInterface().bulkInsert("user_role", seedUserRoles);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("role", { id: seedRoles.map((u) => u.id) });
  await sequelize.getQueryInterface().bulkDelete("user_role", {
    user_id: seedUserRoles.map((ur) => ur.user_id),
    role_id: seedUserRoles.map((ur) => ur.role_id)
  });
};
