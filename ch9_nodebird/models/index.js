import Sequelize from "sequelize";
import config from "../config/config";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const env = process.env.NODE_ENV || "development";
const configEnv = config[env];
const db = {};
const basename = path.basename(__filename);

const sequelize = new Sequelize(
  configEnv.database,
  configEnv.username,
  configEnv.password,
  configEnv
);

//- Automating the dynamic loading of Sequelize models and setting up associations.
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(async (file) => {
    const model = await import(path.join(__dirname, file));
    db[model.default.name] = model.default;
    model.default.initiate(sequelize);
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
