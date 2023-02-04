const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');

const getRankedPlayersByStat = (request, response, next) => {

    let { stat, season } = request.params;

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
      
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getRankedBoxScores = (request, response, next) => {

    let { season } = request.params;
    db.query(`SELECT "boxscores${season}".player_id, "boxscores${season}".player_name, "boxscores${season}".team_id, "boxscores${season}".team_abbreviation, 
                AVG(CAST("boxscores${season}".min AS FLOAT)) AS MIN, 
                AVG(CAST(e_off_rating AS FLOAT)) AS E_OFF_RATING,
                AVG(CAST(off_rating AS FLOAT)) AS OFF_RATING,
                AVG(cast(e_def_rating as float)) AS E_DEF_RATING,
                AVG(CAST(def_rating AS FLOAT)) AS DEF_RATING,
                AVG(CAST(e_net_rating AS FLOAT)) AS E_NET_RATING,
                AVG(cast(net_rating as float)) AS NET_RATING,
                AVG(CAST(ast_pct AS FLOAT)) AS AST_PCT,
                AVG(CAST(ast_tov AS FLOAT)) AS AST_TOV,
                AVG(cast(ast_ratio as float)) AS AST_RATIO,
                AVG(CAST(oreb_pct AS FLOAT)) AS OREB_PCT,
                AVG(CAST(dreb_pct AS FLOAT)) AS DREB_PCT, 
                AVG(CAST(reb_pct AS FLOAT)) AS REB_PCT, 
                AVG(CAST(tm_tov_pct AS FLOAT)) AS TM_TOV_PCT, 
                AVG((CAST("boxscorestraditional${season}".fgm AS FLOAT) + .5 * CAST("boxscorestraditional${season}".fg3m AS FLOAT)) / NULLIF(CAST("boxscorestraditional${season}".fga AS FLOAT), 0)) AS EFG_PCT, 
                AVG(CAST(ts_pct AS FLOAT)) AS TS_PCT, 
                AVG(CAST(usg_pct AS FLOAT)) AS USG_PCT, 
                AVG(CAST(e_usg_pct AS FLOAT)) AS E_USG_PCT, 
                AVG(CAST(e_pace AS FLOAT)) AS E_PACE, 
                AVG(CAST(pace AS FLOAT)) AS PACE,
                AVG(CAST(pace_per40 AS FLOAT)) AS PACE_PER40, 
                AVG(CAST(poss AS FLOAT)) AS POSS, 
                AVG(CAST(pie AS FLOAT)) AS PIE
                FROM "boxscores${season}"
                INNER JOIN "boxscorestraditional${season}"
                ON "boxscorestraditional${season}".player_id = "boxscores${season}".player_id
                WHERE "boxscores${season}".min IS NOT NULL
                AND CAST("boxscores${season}".min AS FLOAT) > 0
                AND "boxscores${season}".player_id != 'PLAYER_ID'
                GROUP BY "boxscores${season}".player_id, "boxscores${season}".player_name, "boxscores${season}".team_id, "boxscores${season}".team_abbreviation`, (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length === 0 || results.rows[0].count === '0') {
            return next(new Error( 'Stats Do Not Exist' ));
        }
        response.status(200).json(results.rows)
    })
}

const getRankedHustleStats = (request, response, next) => {
    const {season} = request.params;
    db.query(`SELECT * FROM "leagueHustleStatsPlayer${season}"`, (error, results) => {
        if (error) {
            throw error;
        }

        response.status(200).json(results.rows)
    })
}

module.exports = {
    getRankedPlayersByStat,
    getRankedStats,
    getRankedBoxScores,
    getRankedHustleStats,
}