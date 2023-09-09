import { Sequelize } from "sequelize-typescript";
import env from "./env.config";

export const authenticateConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const sequelize = new Sequelize(env.DATABASE, env.USER, env.PASSWORD, {
  host: env.DB_HOST,
  dialect: "mysql",
  logging: false
});

export default sequelize;
