import { DataTypes } from "sequelize";
import { Migration } from "../../config/db.config";

export const up: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.addColumn("document", "status", {
    type: DataTypes.ENUM("DRAFT", "REVIEW_REQUESTED", "REVIEW", "CHANGES_REQUESTED", "RAISED", "RESOLVED")
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.removeColumn("document", "status");
};
