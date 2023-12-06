import { Seeder } from "../../config/db.config";

const seedUsers = [
  {
    id: 5,
    email: "normal.student@usc.edu.ph",
    password: "$2b$10$fApSU4GHRDO5amkfOU4xhuQflL1aA3.Gy0752cGYnzYg5e1KpCGcK",
    student_id_number: "19000000",
    full_name: "Normal Student",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 6,
    email: "another.student@usc.edu.ph",
    password: "$2b$10$zcrRoePJDU5yq8uRoh2wYuc4kOcR.50lpNZ556B5dvbC9mJP5U0ve",
    full_name: "Another Student",
    student_id_number: "20000000",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 7,
    email: "cisco.member@usc.edu.ph",
    password: "$2b$10$bzznitP26j4dmE4RS9vlpeWpU65wIZh0aYx/rDgi1uXT9GUSSMXPO",
    full_name: "Cisco Member",
    student_id_number: "20000001",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 8,
    email: "cisco.admin@usc.edu.ph",
    password: "$2b$10$l/KUnnqKNivN4efn2nqgL.vI3e225f0GNIYvl/CTqRb28H1hOBmhu",
    full_name: "Cisco Admin",
    student_id_number: "20000002",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 9,
    email: "another.cisco.admin@usc.edu.ph",
    password: "$2b$10$VW35tsoIhxKThNETWOqIROJOApyd4SEG8w8.oYRsVs/n4d7NT4kKe",
    full_name: "Another Cisco Admin",
    student_id_number: "20000003",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 10,
    email: "another.cisco.member@usc.edu.ph",
    password: "$2b$10$bh0D5Bu9JufwQir1bcTLHuoyMVyWhWQukrhMWm4L5xtBnWjS9T3Le",
    full_name: "Another Cisco Member",
    student_id_number: "20000004",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 11,
    email: "dcism.student@usc.edu.ph",
    password: "$2b$10$USitLzXKQFb.ku1jl3sVr.u7MH1ct.5lvo3lDo8gzyyHXQFJ98Fie",
    full_name: "DCISM Student",
    student_id_number: "20000005",
    created_at: new Date(),
    updated_at: new Date()
  }
];

const seedUserRoles = [
  { user_id: 11, role_id: 1, created_at: new Date(), updated_at: new Date() },
  { user_id: 5, role_id: 1, created_at: new Date(), updated_at: new Date() },
  { user_id: 6, role_id: 1, created_at: new Date(), updated_at: new Date() },
  { user_id: 7, role_id: 2, created_at: new Date(), updated_at: new Date() },
  { user_id: 7, role_id: 1, created_at: new Date(), updated_at: new Date() },
  { user_id: 8, role_id: 2, created_at: new Date(), updated_at: new Date() },
  { user_id: 8, role_id: 3, created_at: new Date(), updated_at: new Date() },
  { user_id: 9, role_id: 2, created_at: new Date(), updated_at: new Date() },
  { user_id: 9, role_id: 3, created_at: new Date(), updated_at: new Date() },
  { user_id: 10, role_id: 1, created_at: new Date(), updated_at: new Date() },
  { user_id: 10, role_id: 2, created_at: new Date(), updated_at: new Date() }
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert("user", seedUsers);
  await sequelize.getQueryInterface().bulkInsert("user_role", seedUserRoles);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("user", { id: seedUsers.map((u) => u.id) });
  await sequelize.getQueryInterface().bulkDelete("user_role", {
    user_id: seedUserRoles.map((ur) => ur.user_id),
    role_id: seedUserRoles.map((ur) => ur.role_id)
  });
};
