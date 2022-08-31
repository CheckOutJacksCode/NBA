const Pool = require('pg').Pool
const pool = new Pool({
  user: 'petejackerson',
  host: process.env(POSTGRESQL_ADDON_HOST),
  database: process.env(POSTGRESQL_ADDON_DB),
  password: process.env(POSTGRESQL_ADDON_PASSWORD),
  port: process.env(POSTGRESQL_ADDON_PORT),
})
var pg = require('pg');
pg.connect(process.env.POSTGRESQL_ADDON_URI, function(err, client, done) {
  module.exports = {
      query: (text, params, callback) => {
        const start = Date.now()
        return client.query(text, params, (err, res) => {
          const duration = Date.now() - start
          console.log('executed query', { duration })
          callback(err, res)
        })
      },
  }
})