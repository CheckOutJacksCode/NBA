const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');

const getAllFirstLastCarmeloPointsInSeason = (request, response) => {
    const season = request.params;
    db.query(`SELECT firstname, lastname, carmelopts FROM "carmeloPts" WHERE season = $1 AND carmelopts!='STATISTICS UNAVAILABLE' ORDER BY CAST(carmelopts AS FLOAT) ASC`, [season.season], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const createPlayerCarmeloPoints = (request, response) => {
    const body = request.body;
  
    db.query('INSERT INTO "carmeloPts" (playerid, firstname, lastname, carmelopts, season) VALUES ($1, $2, $3, $4, $5)', [body.player[0].playerid.toString(), body.player[0].first_name, body.player[0].last_name, body.carmeloPts, body.season], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(body);
    })
}

module.exports = {
    createPlayerCarmeloPoints,
    getAllFirstLastCarmeloPointsInSeason,
}
    