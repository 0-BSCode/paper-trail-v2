import { Seeder } from "../../config/db.config";
import PermissionEnum from "../../types/enums/permission-enum";

// TODO: Refactor to include proper documents
const seedDocuments = [
  {
    id: 1,
    title: "Test Document 1",
    user_id: 1,
    content: "Dummy Content",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 2,
    title: "Test Document 2",
    user_id: 2,
    content: "Dummy Content",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 3,
    title: "Owned by a normal student",
    user_id: 5,
    content: "Dummy Content",
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 4,
    title: "Owned by a CISCO member",
    user_id: 6,
    content: "Dummy Content",
    created_at: new Date(),
    updated_at: new Date()
  }
];

const seedDocumentUsers = [
  { permission: PermissionEnum.EDIT, user_id: 1, document_id: 2, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.VIEW, user_id: 2, document_id: 1, created_at: new Date(), updated_at: new Date() },
  { permission: PermissionEnum.EDIT, user_id: 5, document_id: 4, created_at: new Date(), updated_at: new Date() }
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert("document", seedDocuments);
  await sequelize.getQueryInterface().bulkInsert("document_user", seedDocumentUsers);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("document", { id: seedDocuments.map((u) => u.id) });
  await sequelize.getQueryInterface().bulkDelete("document_user", {
    document_id: seedDocumentUsers.map((d) => d.document_id),
    user_id: seedDocumentUsers.map((u) => u.user_id)
  });
};
