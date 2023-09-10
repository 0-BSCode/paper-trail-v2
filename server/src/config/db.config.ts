import { Sequelize } from "sequelize-typescript";
import env from "./env.config";

const sequelize = new Sequelize(env.DATABASE, env.USER, env.PASSWORD, {
  host: env.DB_HOST,
  dialect: "mysql",
  logging: true
});

export default sequelize;
