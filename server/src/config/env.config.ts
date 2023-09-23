if (
  process.env.PORT === undefined ||
  process.env.USER === undefined ||
  process.env.PASSWORD === undefined ||
  process.env.DB_HOST === undefined ||
  process.env.DATABASE === undefined ||
  process.env.FRONTEND_URL === undefined ||
  process.env.ACCESS_TOKEN_SECRET === undefined ||
  process.env.ACCESS_TOKEN_EXPIRATION === undefined ||
  process.env.REFRESH_TOKEN_SECRET === undefined ||
  process.env.REFRESH_TOKEN_EXPIRATION === undefined ||
  process.env.PASSWORD_RESET_SECRET === undefined ||
  process.env.PASSWORD_RESET_EXPIRATION === undefined ||
  process.env.VERIFY_EMAIL_SECRET === undefined
) {
  throw new Error("Environment variables missing.");
}

const env = {
  PORT: process.env.PORT,
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DATABASE: process.env.DATABASE,
  FRONTEND_URL: process.env.FRONTEND_URL,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRATION: process.env.ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION: process.env.REFRESH_TOKEN_EXPIRATION,
  PASSWORD_RESET_SECRET: process.env.PASSWORD_RESET_SECRET,
  PASSWORD_RESET_EXPIRATION: process.env.PASSWORD_RESET_EXPIRATION,
  VERIFY_EMAIL_SECRET: process.env.VERIFY_EMAIL_SECRET
};

export default env;
