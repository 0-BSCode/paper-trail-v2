import { Seeder } from "../../config/db.config";
import StatusEnum from "../../types/enums/status-enum";

const seedStatus = [
  { id: 1, name: StatusEnum.DRAFT },
  { id: 2, name: StatusEnum.REVIEW_REQUESTED },
  { id: 3, name: StatusEnum.REVIEW },
  { id: 4, name: StatusEnum.CHANGES_REQUESTED },
  { id: 5, name: StatusEnum.RAISED },
  { id: 6, name: StatusEnum.RESOLVED }
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert("status", seedStatus);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("status", { id: seedStatus.map((u) => u.id) });
};
