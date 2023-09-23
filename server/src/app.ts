import express from "express";
import cors from "cors";
import router from "./routes";
import errorHandler from "./middleware/error-handler";
import env from "./config/env.config";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [env.FRONTEND_URL]
  })
);
app.use(router);
app.use(errorHandler);

export default app;
