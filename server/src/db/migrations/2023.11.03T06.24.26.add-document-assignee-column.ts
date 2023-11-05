import { DataTypes } from "sequelize";
import { Migration } from "../../config/db.config";

export const up: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.addColumn("document", "assignee_id", {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: "user", key: "id" },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.removeColumn("document", "assignee_id");
};
