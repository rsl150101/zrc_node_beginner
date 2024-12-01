import dotenv from "dotenv";
dotenv.config();

const development = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
};
const test = {
  username: "test",
  password: null,
  database: "database_test",
  host: "127.0.0.1",
  dialect: "mysql",
};
const production = {
  username: "production",
  password: null,
  database: "database_production",
  host: "127.0.0.1",
  dialect: "mysql",
};

export default { development, test, production };
