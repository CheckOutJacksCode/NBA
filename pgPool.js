const Pool = require('pg').Pool
const pool = new Pool({
  user: 'u1uwoj4vkzaibcrbkar2',
  host: 'bxkh0cfee6cemj2x04k4-postgresql.services.clever-cloud.com',
  database: 'bxkh0cfee6cemj2x04k4',
  password: 'xjDsN2jWd6E7dsNrShyX',
  port: 5318,
})
/*
user: 'u1uwoj4vkzaibcrbkar2',
host: 'bxkh0cfee6cemj2x04k4-postgresql.services.clever-cloud.com',
database: 'bxkh0cfee6cemj2x04k4',
password: 'xjDsN2jWd6E7dsNrShyX',
port: 5318,

user: 'petejackerson',
host: 'localhost',
database: 'NBAstatistics',
password: 'redsox45',
port: 5432,
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