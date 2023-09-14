import { DataTypes } from "sequelize";
import { Migration } from "../../config/db.config";
import RoleEnum from "../../types/enums/role-enum";

export const up: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.createTable("user", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    verification_token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password_reset_token: {
      type: DataTypes.STRING,
      allowNull: true
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

  await queryInterface.createTable("role", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.ENUM("ADMIN", "SUPERADMIN"),
      allowNull: false,
      defaultValue: RoleEnum.ADMIN
    }
  });

  await queryInterface.createTable("user_role", {
    user_id: {
      type: DataTypes.INTEGER,
      references: { model: "user", key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      primaryKey: true
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: { model: "role", key: "id" },
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
  await queryInterface.dropTable("user_role");
  await queryInterface.dropTable("user");
  await queryInterface.dropTable("role");
};
