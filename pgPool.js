const Pool = require('pg').Pool
const pool = new Pool({
  user: 'petejackerson',
  host: 'localhost',
  database: 'NBAstatistics',
  password: 'redsox45',
  port: 5432,
})

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