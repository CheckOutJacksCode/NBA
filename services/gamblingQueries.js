const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');

const getOddsFromCSV = (request, response, next) => {
    let season = request.params;
    const data = [];
    fs.createReadStream(`./juicystats/odds${season.season}.csv`)
        .pipe(
          parse({
            delimiter: " ",
            columns: true,
            relax_column_count: true,
            ltrim: true,
          })
        )
        .on("data", function async(row) {
          // 👇 push the object row into the array
            data.push(row);
            console.log(row);
        })
        .on("error", function async(error) {
            return next(error);
        })
        .on("end", function async() {
        // 👇 log the result array
        console.log("parsed csv data:"); 
        console.log(data);
        response.status(201).send(data);
    })
}
  
const createOddsBySeason = (request, response, next) => {
    const body = request.body;
    const season = request.params;
    db.query(`INSERT INTO "odds${season.season}" (date, rot, vh, team, first, second, third, fourth, final, open, close, ml, h2h) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`, 
    [body[0], body[1], body[2], body[3], body[4], body[5], body[6], body[7], body[8], body[9], body[10], body[11], body[12]], (error, results) => {
        if (error) {
            return next(error);
        }
        response.status(201).send(body);
    })
}
  
const getHomeMoneyline = (request, response, next) => {
    const {season, homeTeam, gamedate} = request.params;
    db.query(`SELECT ml FROM "odds${season}"
              WHERE team = $1
              AND date = $2`, [homeTeam, gamedate], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}
  
const getVisitorMoneyline = (request, response, next) => {
    const {season, visitorTeam, gamedate} = request.params;
    db.query(`SELECT ml FROM "odds${season}"
              WHERE team = $1
              AND date = $2`, [visitorTeam, gamedate], (error, results) => {
        if (error) {
            return next(error);
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getVisitorMoneyline,
    getHomeMoneyline,
    getOddsFromCSV,
    createOddsBySeason,   
}