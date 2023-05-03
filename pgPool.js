const Pool = require('pg-pool');
const url = require('url');
require('dotenv').config();

const config = {
  user: PG_USERNAME,
  host: PG_HOST,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: PG_PORT
};

const pool = new Pool(config);
module.exports = {
    query: (text, params, callback) => {
      const start = Date.now()
      return pool.query(text, params, (err, res) => {
        const duration = Date.now() - start
        console.log('executed query', { duration })
        callback(err, res)
      })
    },
}