import { DataTypes } from "sequelize";
import { Migration } from "../../config/db.config";

export const up: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.createTable("notification", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "user", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    document_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: "document", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
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

  await queryInterface.dropTable("notification");
};
