import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    username: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASS,
    database: process.env.DEV_DB_NAME,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASS,
    database: process.env.TEST_DB_NAME,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    username: process.env.PROD_DB_USER,
    password: process.env.PROD_DB_PASS,
    database: process.env.PROD_DB_NAME,
    host: '127.0.0.1',
    dialect: 'postgres'
  }
};

export default config;
