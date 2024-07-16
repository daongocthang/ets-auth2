import * as dotenv from "dotenv";
import { Dialect, Op, Sequelize } from "sequelize";

dotenv.config();

const operatorsAliases = {
  $like: Op.like,
  $or: Op.or,
  $not: Op.not,
  $eq: Op.eq,
  $gte: Op.gte,
};

const { DB_NAME, DB_USER, DB_HOST, DB_DRIVER, DB_PASSWORD } = process.env;

const dbName = DB_NAME as string;
const dbUser = DB_USER as string;
const dbHost = DB_HOST;
const dbDriver = DB_DRIVER as Dialect;
const dbPassword = DB_PASSWORD;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  pool: {
    min: 0,
    max: 5,
    acquire: 30000,
    idle: 10000,
  },
  operatorsAliases,
});

export default sequelizeConnection;
