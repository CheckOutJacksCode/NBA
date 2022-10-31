const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');

const getPlayerSeasonGameStatsOfficial = async(request, response) => {
    let {playerid, seasonyear} = request.params;
  
    db.query(`SELECT * FROM "boxscorestraditional${seasonyear}"
              WHERE player_id = $1`, [playerid], (error, results) => {
      if (error) {
        throw error
      }
      //console.log(results.rows)
  
      response.status(200).json(results.rows)
    })
}

  
const createBoxScoresTraditional = (request, response) => {
    const body = request.body;
    let season = request.params;
    console.log(season.season)
    console.log(body);
    db.query(`INSERT INTO "boxscorestraditional${season.season}" (game_id, team_id, team_abbreviation, team_city, player_id, player_name, nickname, start_position, comment, min, fgm, fga, fg_pct, fg3m, fg3a, fg3_pct, ftm, fta, ft_pct, oreb, dreb, reb, ast, stl, blk, turnovers, pf, pts, plus_minus) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29)`,
    [body.GAME_ID, body.TEAM_ID, body.TEAM_ABBREVIATION, body.TEAM_CITY, body.PLAYER_ID, body.PLAYER_NAME, body.NICKNAME, body.START_POSITION, body.COMMENT, body.MIN, body.FGM, body.FGA, body.FG_PCT, body.FG3M, body.FG3A, body.FG3_PCT, body.FTM, body.FTA, body.FT_PCT, body.OREB, body.DREB, body.REB, body.AST, body.STL, body.BLK, body.TO, body.PF, body.PTS, body.PLUS_MINUS], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(body);
    });
}

const boxScoreTraditionalLoad = (request, response) => {

    let season = request.params;
    console.log(season);
    const data = [];
    fs.createReadStream(`./boxscorestraditional${season.season}.csv`)
        .pipe(
          parse({
            delimiter: ",",
            columns: true,
            ltrim: true,
          })
        )
        .on("data", function async(row) {
          // 👇 push the object row into the array
            data.push(row);
        })
        .on("error", function async(error) {
            console.log(error.message);
        })
        .on("end", function async() {
        // 👇 log the result array
        console.log("parsed csv data:");
        console.log(data); 
        response.status(201).send(data);
    })
}

const getBoxScoresTraditional = async(request, response) => {
    let { season, gameid, playerid } = request.params;
    db.query(`SELECT * FROM "boxscorestraditional${season}" WHERE game_id = $1 AND player_id = $2`, [gameid, playerid], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
  
  
  
const getOfficialPlayerIdList = (request, response) => {
    
    let {season} = request.params;
    db.query(`SELECT distinct player_id FROM "boxscorestraditional${season}"`, (error, results) => {
      if (error) {
        throw error
      }
  
      response.status(200).json(results.rows)
    })
}
  
const getOfficialPlayerIdNameList = (request, response) => {
    
    let {season} = request.params;
    db.query(`SELECT distinct player_id, player_name FROM "boxscorestraditional${season}"`, (error, results) => {
      if (error) {
        throw error
      }
  
      response.status(200).json(results.rows)
    })
}

  
const getTeamPlayersFromTeamId = async(request, response) => {
    let teamid = request.params;
    db.query('SELECT DISTINCT player_name FROM "boxscorestraditional2021-2022" WHERE team_id = $1', [teamid.teamid], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getRosterBySeasonByTeam = (request, response) => {
    const { season, team } = request.params;
    console.log(season)
    console.log(team)
    db.query(`SELECT DISTINCT player_id, player_name FROM "boxscorestraditional${season}" WHERE team_id = $1`, [team], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
    })
}
  
const getBoxScoreTraditionalStats = (request, response) => {
    const {playerid, season} = request.params;
  
    db.query(`SELECT * FROM "boxscorestraditional${season}" WHERE player_id = $1`, [playerid], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
    })
}
  


const getBoxScoreTraditionalHome = (request, response) => {
    const {playerid, season} = request.params;
    console.log(season)
    db.query(`SELECT * FROM "boxscorestraditional${season}" 
              INNER JOIN "boxscoresummary${season}" 
              ON "boxscorestraditional${season}".game_id = "boxscoresummary${season}".game_id
              WHERE player_id = $1
              AND "boxscoresummary${season}".home_team_id = "boxscorestraditional${season}".team_id
              ORDER BY "boxscorestraditional${season}".id`, [playerid], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
    })
}
  
const getBoxScoreTraditionalVisitor = (request, response) => {
    const {playerid, season} = request.params;
  
    db.query(`SELECT * FROM "boxscorestraditional${season}" 
              INNER JOIN "boxscoresummary${season}" 
              ON "boxscorestraditional${season}".game_id = "boxscoresummary${season}".game_id
              WHERE player_id = $1
              AND "boxscoresummary${season}".visitor_team_id = "boxscorestraditional${season}".team_id
              ORDER BY "boxscorestraditional${season}".id`, [playerid], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
    })
}

const getPreviousGameIdBySeasonByTeam = (request, response) => {
    console.log('ffffffffffff')
    const {season, teamId} = request.params;
    db.query(`SELECT game_id FROM "boxscorestraditional${season}"
              WHERE team_id = $1
              ORDER BY id DESC LIMIT 1`, [teamId], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
    })
}
  
const getPreviousRosterBySeasonByTeamByGameId = (request, response) => {
    const { season, teamId, gameid } = request.params;
    console.log('aaaaaaaa')
    console.log(season)
    console.log(teamId)
    console.log(gameid)
    db.query(`SELECT DISTINCT player_id, player_name FROM "boxscorestraditional${season}" 
              WHERE team_id = $1 AND game_id = $2`, [teamId, gameid], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
    })
}

  
const getBoxNumFromGameIdSeason = (request, response) => {
    const {gameid, season, teamid, H_or_V} = request.params;
    console.log('boosh');
    console.log(season);
    console.log(gameid);
    console.log(teamid);
  
    db.query(`SELECT COUNT(DISTINCT "boxscorestraditional${season}".game_id) FROM "boxscorestraditional${season}"
              INNER JOIN "boxscoresummary${season}"
              ON "boxscorestraditional${season}".game_id = "boxscoresummary${season}".game_id 
              WHERE CAST(SUBSTRING("boxscorestraditional${season}".game_id, 3) AS INT) < $1
              AND "boxscorestraditional${season}".team_id = $2
              AND "boxscoresummary${season}".${H_or_V}_team_id = $3`, [gameid, teamid, teamid], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
    })
}

module.exports = {
    getPlayerSeasonGameStatsOfficial,
    getBoxNumFromGameIdSeason,
    getPreviousRosterBySeasonByTeamByGameId,
    getPreviousGameIdBySeasonByTeam,
    getBoxScoreTraditionalVisitor,
    getBoxScoreTraditionalHome,
    getBoxScoreTraditionalStats,
    getRosterBySeasonByTeam,         
    getTeamPlayersFromTeamId,
    getOfficialPlayerIdNameList,
    getOfficialPlayerIdList,
    getBoxScoresTraditional,
    boxScoreTraditionalLoad,
    createBoxScoresTraditional,  
}