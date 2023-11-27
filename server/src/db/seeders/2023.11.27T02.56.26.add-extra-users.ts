import { Seeder } from "../../config/db.config";

const seedUsers = [
  {
    id: 5,
    email: "normal.student@usc.edu.ph",
    password: "$2b$10$lZWq9TZH4PJZVKscZ7SDvezJo8TEDHLZk2Va8U0G998XNt80VsNXa",
    is_verified: true,
    verification_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJub3JtYWwuc3R1ZGVudEB1c2MuZWR1LnBoIiwicm9sZXMiOlsiU1RVREVOVCJdLCJpYXQiOjE2OTg3NjMxNzUsImV4cCI6MTY5OTM2Nzk3NX0.jKrmLRPUsUKexwMpLpCXNqBDFPlTExHfEhurNBkTmdM",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 6,
    email: "another.student@usc.edu.ph",
    password: "$2b$10$YNxEkqI6.t4FtymPrFkCW./VyFidyFjMO0VUyYMnHjZ8ZYJvbtGdG",
    is_verified: true,
    verification_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJhbm90aGVyLnN0dWRlbnRAdXNjLmVkdS5waCIsInJvbGVzIjpbIlNUVURFTlQiXSwiaWF0IjoxNjk4NzYzMjE5LCJleHAiOjE2OTkzNjgwMTl9.GZzPVLWuYFs-Z2DLEtnRuT6QJ__1kkz9deriqnil2BI",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 7,
    email: "cisco.member@usc.edu.ph",
    password: "$2b$10$C7KwNUeAaOyrxDTiiMBi/eKcyr2ajShklrREcc.a5R15rmncL2Dk2",
    is_verified: true,
    verification_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJjaXNjby5tZW1iZXJAdXNjLmVkdS5waCIsInJvbGVzIjpbIkNJU0NPX01FTUJFUiJdLCJpYXQiOjE2OTg3NjMyNDQsImV4cCI6MTY5OTM2ODA0NH0.HZNPZ4txdEBQQDPg_mLMHkCpY7gl_yuD6EIKfwNJbts"
  },
  {
    id: 8,
    email: "cisco.admin@usc.edu.ph",
    password: "$2b$10$C7KwNUeAaOyrxDTiiMBi/eKcyr2ajShklrREcc.a5R15rmncL2Dk2",
    is_verified: true,
    verification_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJjaXNjby5tZW1iZXJAdXNjLmVkdS5waCIsInJvbGVzIjpbIkNJU0NPX01FTUJFUiJdLCJpYXQiOjE2OTg3NjMyNDQsImV4cCI6MTY5OTM2ODA0NH0.HZNPZ4txdEBQQDPg_mLMHkCpY7gl_yuD6EIKfwNJbts"
  },
  {
    id: 9,
    email: "another.cisco.admin@usc.edu.ph",
    password: "$2b$10$C7KwNUeAaOyrxDTiiMBi/eKcyr2ajShklrREcc.a5R15rmncL2Dk2",
    is_verified: true,
    verification_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJjaXNjby5tZW1iZXJAdXNjLmVkdS5waCIsInJvbGVzIjpbIkNJU0NPX01FTUJFUiJdLCJpYXQiOjE2OTg3NjMyNDQsImV4cCI6MTY5OTM2ODA0NH0.HZNPZ4txdEBQQDPg_mLMHkCpY7gl_yuD6EIKfwNJbts"
  },
  {
    id: 10,
    email: "another.cisco.member@usc.edu.ph",
    password: "$2b$10$C7KwNUeAaOyrxDTiiMBi/eKcyr2ajShklrREcc.a5R15rmncL2Dk2",
    is_verified: true,
    verification_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJjaXNjby5tZW1iZXJAdXNjLmVkdS5waCIsInJvbGVzIjpbIkNJU0NPX01FTUJFUiJdLCJpYXQiOjE2OTg3NjMyNDQsImV4cCI6MTY5OTM2ODA0NH0.HZNPZ4txdEBQQDPg_mLMHkCpY7gl_yuD6EIKfwNJbts"
  },
  {
    id: 11,
    email: "dcism.student@usc.edu.ph",
    password: "$2b$10$C7KwNUeAaOyrxDTiiMBi/eKcyr2ajShklrREcc.a5R15rmncL2Dk2",
    is_verified: true,
    verification_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJjaXNjby5tZW1iZXJAdXNjLmVkdS5waCIsInJvbGVzIjpbIkNJU0NPX01FTUJFUiJdLCJpYXQiOjE2OTg3NjMyNDQsImV4cCI6MTY5OTM2ODA0NH0.HZNPZ4txdEBQQDPg_mLMHkCpY7gl_yuD6EIKfwNJbts"
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
