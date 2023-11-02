import { DataTypes } from "sequelize";
import { Migration } from "../../config/db.config";
import StatusEnum from "../../types/enums/status-enum";

export const up: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.createTable("status", {
    name: {
      type: DataTypes.ENUM("DRAFT", "REVIEW_REQUESTED", "REVIEW", "CHANGES_REQUESTED", "RAISED", "RESOLVED"),
      allowNull: false,
      defaultValue: StatusEnum.DRAFT
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  await queryInterface.addColumn("document", "status", {
    type: DataTypes.ENUM("DRAFT", "REVIEW_REQUESTED", "REVIEW", "CHANGES_REQUESTED", "RAISED", "RESOLVED")
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.dropTable("status");

  await queryInterface.removeColumn("document", "status");
};
