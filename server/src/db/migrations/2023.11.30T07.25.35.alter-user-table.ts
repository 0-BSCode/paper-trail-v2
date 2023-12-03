import { DataTypes } from "sequelize";
import { Migration } from "../../config/db.config";

export const up: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.addColumn("user", "full_name", {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ""
  });

  await queryInterface.addColumn("user", "contact_number", {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ""
  });

  await queryInterface.addColumn("user", "course_and_year", {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ""
  });

  await queryInterface.addColumn("user", "student_id_number", {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ""
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  const queryInterface = sequelize.getQueryInterface();

  await queryInterface.removeColumn("user", "full_name");
  await queryInterface.removeColumn("user", "contact_number");
  await queryInterface.removeColumn("user", "course_and_year");
  await queryInterface.removeColumn("user", "student_id_number");
};
