import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import config from '../config/config';

//  read .env variables
dotenv.config();

const currentEnvironment = process.ENV.NODE_ENV || 'development';

const sequelizeInstance = new Sequelize(
  config[currentEnvironment].database,
  config[currentEnvironment].username,
  config[currentEnvironment].password
);

export default sequelizeInstance;
