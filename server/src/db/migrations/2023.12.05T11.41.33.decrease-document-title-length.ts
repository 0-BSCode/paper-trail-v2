import { DataTypes } from "sequelize";
import { Migration } from "../../config/db.config";

export const up: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.changeColumn("document", "title", {
    type: DataTypes.STRING(25),
    allowNull: false,
    defaultValue: "[Untitled]"
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.changeColumn("document", "title", {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "[Untitled]"
  });
};
