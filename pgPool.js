const Pool = require('pg').Pool
const pool = new Pool(
  process.env.DATABASE_URL
)

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