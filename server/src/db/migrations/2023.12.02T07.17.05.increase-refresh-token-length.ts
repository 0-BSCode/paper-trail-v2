import { DataTypes } from "sequelize";
import { Migration } from "../../config/db.config";

export const up: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.changeColumn("refresh_token", "token", {
    type: DataTypes.TEXT
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.changeColumn("refresh_token", "token", {
    type: DataTypes.STRING(255)
  });
};
