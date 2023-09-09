console.log(process.env);

if (
  process.env.PORT === undefined ||
  process.env.USER === undefined ||
  process.env.PASSWORD === undefined ||
  process.env.DB_HOST === undefined ||
  process.env.DB_PORT === undefined ||
  process.env.DATABASE === undefined ||
  process.env.FRONTEND_URL === undefined
) {
  throw new Error("Environment variables missing.");
}

const env = {
  PORT: process.env.PORT,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DATABASE: process.env.DATABASE,
  FRONTEND_URL: process.env.FRONTEND_URL
};

export default env;
