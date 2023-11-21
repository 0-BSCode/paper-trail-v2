import { Seeder } from "../../config/db.config";

// TODO: Create notifications for comment creation
const seedComments = [
  {
    id: 1,
    content: "Have you raised this with your professor already?",
    user_id: 2,
    document_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 2,
    content: "Yes I have. No response",
    user_id: 1,
    document_id: 1,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 3,
    content: "Could you add some files for proof?",
    user_id: 4,
    document_id: 2,
    created_at: new Date(),
    updated_at: new Date()
  }
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert("comment", seedComments);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("comment", { id: seedComments.map((u) => u.id) });
};
