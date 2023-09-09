import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import http from "http";
import app from "./app";
import env from "./config/env.config";
import { authenticateConnection } from "./config/db.config";

const server = http.createServer(app);

server.listen(env.PORT, async () => {
  await authenticateConnection();
  console.log(`Server listening on port ${env.PORT}...`);
});
