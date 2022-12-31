
const { Pool } = require('pg');
const pool = new Pool();

pool.on('error', (err, client) => {
    console.error('unexpected error on idle client', err);
    process.exit(-1);
});

pool.on('connect', (err, client) => {
    if (err) console.error(err);
    console.log(client);
    console.log('successfully connected to postgres.');
});

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRESQL_ADDON_URI, {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})
/*const Pool = require('pg').Pool


const pool = new Pool({
  user: process.env.POSTGRESQL_ADDON_USER,
  host: process.env.POSTGRESQL_ADDON_HOST,
  database: process.env.POSTGRESQL_ADDON_DB,
  password: process.env.POSTGRESQL_ADDON_PASSWORD,
  port: process.env.POSTGRESQL_ADDON_PORT,
  ssl: {
    rejectUnauthorized: false,
  }
})
*/
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