import { DataTypes } from "sequelize";
import { Migration } from "../../config/db.config";

export const up: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.createTable("document_assignee", {
    assignee_id: {
      type: DataTypes.INTEGER,
      references: { model: "user", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      primaryKey: true
    },
    document_id: {
      type: DataTypes.INTEGER,
      references: { model: "document", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      primaryKey: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.dropTable("document_assignee");
};
