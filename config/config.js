require('dotenv').config(); // this is important!
module.exports = {
  "development": {
    "username": "petejackerson",
    "password": "redsox45",
    "database": "NBAstatistics",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.POSTGRESQL_ADDON_USER,
    "host": process.env.POSTGRESQL_ADDON_HOST,
    "database": process.env.POSTGRESQL_ADDON_DB,
    "password": process.env.POSTGRESQL_ADDON_PASSWORD,
    "dialect": "postgres",
    "dialectOptions": {
        "ssl": {
          "rejectUnauthorized": false
        }
      }
  }
}
