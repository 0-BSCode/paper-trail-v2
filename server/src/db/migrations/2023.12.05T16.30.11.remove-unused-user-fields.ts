import { DataTypes } from "sequelize";
import { Migration } from "../../config/db.config";

export const up: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();
  await queryInterface.removeColumn("user", "is_verified");
  await queryInterface.removeColumn("user", "verification_token");
  await queryInterface.removeColumn("user", "password_reset_token");
};

export const down: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();
  await queryInterface.addColumn("user", "is_verified", {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  });
  await queryInterface.addColumn("user", "verification_token", {
    type: DataTypes.STRING,
    allowNull: true
  });
  await queryInterface.addColumn("user", "password_reset_token", {
    type: DataTypes.STRING,
    allowNull: true
  });
};
