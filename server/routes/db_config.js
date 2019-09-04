const Pool = require('pg').Pool;
const dotenv = require('dotenv');

dotenv.config();
const env = process.env.NODE_ENV || 'test';

let connection = {};

if(env === 'development') {
  connection = {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    };
}
else if(env === 'test') {
  connection = {
    user: process.env.TEST_DB_USER,
    host: process.env.DB_HOST,
    database: process.env.TEST_DB_NAME,
    password: process.env.TEST_DB_PASSWORD,
    port: process.env.DB_PORT,
  };
}
else {
  console.log("node_env set");
  connection = {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  };
}

const pool = new Pool(connection);

module.exports = pool;