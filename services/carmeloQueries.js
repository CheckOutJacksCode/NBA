const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');

const getAllFirstLastCarmeloPointsInSeason = (request, response, next) => {
    const season = request.params;
    db.query(`SELECT firstname, lastname, carmelopts FROM "carmeloPts" WHERE season = $1 AND carmelopts!='STATISTICS UNAVAILABLE' ORDER BY CAST(carmelopts AS FLOAT) ASC`, [season.season], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const createPlayerCarmeloPoints = (request, response, next) => {
    const body = request.body;
  
    db.query('INSERT INTO "carmeloPts" (playerid, firstname, lastname, carmelopts, season) VALUES ($1, $2, $3, $4, $5)', [body.player[0].playerid.toString(), body.player[0].first_name, body.player[0].last_name, body.carmeloPts, body.season], (error, results) => {
        if (error) {
            return next(error)
        }
        response.status(201).send(body);
    })
}

module.exports = {
    createPlayerCarmeloPoints,
    getAllFirstLastCarmeloPointsInSeason,
}
    