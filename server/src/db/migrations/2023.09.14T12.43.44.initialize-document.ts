import { DataTypes } from "sequelize";
import { Migration } from "../../config/db.config";
import PermissionEnum from "../../types/enums/permission-enum";

export const up: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.createTable("document", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "[Untitled]"
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: { model: "user", key: "id" },
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

  await queryInterface.createTable("document_user", {
    permission: {
      type: DataTypes.ENUM("VIEW", "EDIT"),
      allowNull: false,
      defaultValue: PermissionEnum.VIEW
    },
    user_id: {
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

  await queryInterface.dropTable("document_user");
  await queryInterface.dropTable("document");
};
