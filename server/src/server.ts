import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import http from "http";
import app from "./app";
import env from "./config/env.config";

const server = http.createServer(app);

server.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}...`);
});
