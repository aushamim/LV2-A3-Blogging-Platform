import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port             : process.env.PORT,
  production       : process.env.PRODUCTION === "true",
  dbUrl            : process.env.DB_URL,
  saltRounds       : process.env.SALT_ROUNDS,
  jwtAccessSecret  : process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret : process.env.JWT_REFRESH_SECRET,
  jwtAccessExpire  : process.env.JWT_ACCESS_EXPIRE,
  jwtRefreshExpire : process.env.JWT_REFRESH_EXPIRE,
}; // prettier-ignore
