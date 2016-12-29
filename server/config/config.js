import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    username: process.ENV.DEV_DB_USER,
    password: process.ENV.DEV_DB_PASS,
    database: process.ENV.DEV_DB_NAME,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: process.ENV.TEST_DB_USER,
    password: process.ENV.TEST_DB_PASS,
    database: process.ENV.TEST_DB_NAME,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    username: process.ENV.PROD_DB_USER,
    password: process.ENV.PROD_DB_PASS,
    database: process.ENV.PROD_DB_NAME,
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};

export default config;
