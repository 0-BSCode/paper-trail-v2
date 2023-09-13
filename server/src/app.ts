import express from "express";
import cors from "cors";
import db from "./db/models";
import router from "./routes";
import errorHandler from "./middleware/error-handler";
import env from "./config/env.config";

// MIDDLEWARE
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [env.FRONTEND_URL]
  })
);
app.use(router);
app.use(errorHandler);

// DATABASE
// db.sequelize.sync({logging: (msg) => console.log(msg)});
// import seedDatabase from "./db";
db.sequelize.sync({ force: true, logging: (msg) => console.log(msg) }).then(() => {
  console.log("DB dropped and re-synced!");
});
// .then(() => {
//   seedDatabase().then(() => {
//     console.log("DB seeded!");
//   });
// });

export default app;
