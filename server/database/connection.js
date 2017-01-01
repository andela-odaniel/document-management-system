import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import config from '../config/config';

//  read .env variables
dotenv.config();

export const currentEnvironment = process.env.NODE_ENV || 'development';

export const sequelizeInstance = new Sequelize(
  config[currentEnvironment].database,
  config[currentEnvironment].username,
  config[currentEnvironment].password, {
    host: config[currentEnvironment].host,
    dialect: config[currentEnvironment].dialect
  }
);
