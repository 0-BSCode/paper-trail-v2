import { DataTypes } from "sequelize";
import { Migration } from "../../config/db.config";

export const up: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.renameColumn("notification", "user_id", "receiver_id");

  await queryInterface.addColumn("notification", "sender_id", {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: "user", key: "id" },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.removeColumn("notification", "sender_id");
  await queryInterface.renameColumn("notification", "receiver_id", "user_id");
};
