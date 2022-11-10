const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');
const errors = require('../middleware/errors.js');  


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

const getPreviousRosterBySeasonByTeamByGameId = (request, response) => {
    const { season, teamId, gameid } = request.params;
    console.log('aaaaaaaa')
    db.query(`SELECT DISTINCT player_id, player_name FROM "boxscorestraditional${season}" 
              WHERE team_id = $1 AND game_id = $2`, [teamId, gameid], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
    })
}

module.exports = {
    getPreviousRosterBySeasonByTeamByGameId,
    getRosterBySeasonByTeam,         
    getTeamPlayersFromTeamId,
    getOfficialPlayerIdNameList,
    getOfficialPlayerIdList,  
}