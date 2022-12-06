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
                AND ${stat} != UPPER('${stat}')
                AND ${stat} != 'TO'
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
    db.query(`SELECT player_id, player_name, team_id, team_abbreviation,
                AVG(CAST(min AS FLOAT)) AS MIN, 
                AVG(CAST(fgm AS FLOAT)) AS FGM,
                AVG(CAST(fga AS FLOAT)) AS FGA,
                sum(cast(fgm as float)) / NULLIF(sum(cast(fga as float)), 0) AS FG_PCT,
                AVG(CAST(fg3m AS FLOAT)) AS FG3M,
                AVG(CAST(fg3a AS FLOAT)) AS FG3A,
                sum(cast(fg3m as float)) / NULLIF(sum(cast(fg3a as float)), 0) AS FG3_PCT,
                AVG(CAST(ftm AS FLOAT)) AS FTM,
                AVG(CAST(fta AS FLOAT)) AS FTA,
                sum(cast(ftm as float)) / NULLIF(sum(cast(fta as float)), 0) AS FT_PCT,
                AVG(CAST(oreb AS FLOAT)) AS OREB,
                AVG(CAST(dreb AS FLOAT)) AS DREB, 
                AVG(CAST(reb AS FLOAT)) AS REB, 
                AVG(CAST(ast AS FLOAT)) AS AST, 
                AVG(CAST(stl AS FLOAT)) AS STL, 
                AVG(CAST(blk AS FLOAT)) AS BLK, 
                AVG(CAST(turnovers AS FLOAT)) AS TO, 
                AVG(CAST(pf AS FLOAT)) AS PF, 
                AVG(CAST(pts AS FLOAT)) AS PTS, 
                AVG(CAST(plus_minus AS FLOAT)) AS "+/-"
                FROM "boxscorestraditional${season}"
                WHERE min IS NOT NULL
                AND ft_pct IS NOT NULL
                AND CAST(min AS FLOAT) > 0
                AND player_id != 'PLAYER_ID'
                GROUP BY player_id, player_name, team_id, team_abbreviation`, (error, results) => {
        if (error) {
            throw error;
        }
        console.log(results);
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