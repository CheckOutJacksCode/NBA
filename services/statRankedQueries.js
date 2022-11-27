const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');

const getRankedPlayersByStat = (request, response, next) => {

    let { stat, season } = request.params;
    console.log(stat)
    db.query(`SELECT AVG(CAST(${stat} AS FLOAT)), player_id, player_name
                FROM "boxscorestraditional${season}"
                WHERE ${stat} IS NOT NULL
                AND ${stat} != ''
                AND ${stat} != 'REB'
                GROUP BY player_id, player_name
                ORDER BY AVG(CAST(${stat} AS FLOAT)) DESC`, (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getRankedStats = (request, response, next) => {

    let { season } = request.params;
    db.query(`SELECT player_id, player_name, team_id,
                AVG(CAST(min AS FLOAT)),
                AVG(CAST(fgm AS FLOAT)), 
                AVG(CAST(fga AS FLOAT)),
                AVG(CAST(fg_pct AS FLOAT)), 
                AVG(CAST(fg3m AS FLOAT)), 
                AVG(CAST(fg3a AS FLOAT)), 
                AVG(CAST(fg3_pct AS FLOAT)), 
                AVG(CAST(ftm AS FLOAT)), 
                AVG(CAST(fta AS FLOAT)), 
                AVG(CAST(ft_pct AS FLOAT)), 
                AVG(CAST(oreb AS FLOAT)), 
                AVG(CAST(dreb AS FLOAT)), 
                AVG(CAST(reb AS FLOAT)), 
                AVG(CAST(ast AS FLOAT)), 
                AVG(CAST(stl AS FLOAT)), 
                AVG(CAST(blk AS FLOAT)), 
                AVG(CAST(turnovers AS FLOAT)), 
                AVG(CAST(pf AS FLOAT)), 
                AVG(CAST(pts AS FLOAT)), 
                AVG(CAST(plus_minus AS FLOAT)) 
                FROM "boxscorestraditional${season}"
                GROUP BY player_id, player_name, team_id`, (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getRankedPlayersByStat,
    getRankedStats,
}