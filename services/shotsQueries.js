const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');

const getShots = async(request, response) => {
    let shotsArray = [];
    let years = ['2015-2016', '2016-2017', '2017-2018', '2018-2019', '2019-2020', '2020-2021', '2021-2022'];
    for (let i = 0; i < years.length; i++) {
        let shots = await require(`./${years[i]}.json`);
        shotsArray.push(shots);
    }
    response.status(200).send(shotsArray);    
  }
  //CHANGE ALL AWAITS TO SQL QUERIES, IDIOT.
  const getShotsLocal = async(request, response) => {
    db.query('SELECT * FROM "2015-2016"', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
  }

  const getShotsBySeason = async(request, response) => {
    let season = request.params;
    //console.log(season['season']);
    let shots = await require(`./${season['season']}.json`);
    response.status(200).send(shots);    
  }

  const getShotsBySeasonLocal = async(request, response) => {
    let season = request.params;
    db.query(`SELECT * FROM "${season["season"]}"`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
  }
  
  const getShotsByPlayerBySeason = async(request, response) => {
    let season = request.params;
    //console.log(season['season']);
    let shots = await require(`./${season['season']}.json`);
    response.status(200).send(shots);    
  }
  
  const getShotsByPlayerBySeasonLocal = async(request, response) => {
    let { player, season } = request.params;
    console.log(player);
    console.log(season);
    db.query(`SELECT * FROM "${season}" WHERE player_name = $1`, [player], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
  }
  
  const getShotsByPlayerBySeasonByGameLocal = async(request, response) => {
    let { player, season, game_id } = request.params;
    let playerid = player.player_id;
    console.log(season);
    console.log(player);
    console.log(game_id);
    db.query(`SELECT * FROM "${season}" WHERE player_name = $1 AND game_id = $2`, [player, game_id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
  }

  const getShotsByPlayerLocal = async(request, response) => {
    let player = request.params;
    let playerid = player.playerid;
    db.query('SELECT * FROM "2015-2016" WHERE playerid = $1', [playerid], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
  }
  
  const createShot = (request, response) => {
    const body = request.body;
    db.query('INSERT INTO shotchartdetail (grid_type, game_id, game_event_id, player_id, player_name, team_id, team_name, period, minutes_remaining, seconds_remaining, event_type, action_type, shot_type, shot_zone_basic, shot_zone_area, shot_zone_range, shot_distance, loc_x, loc_y, shot_attempted_flag, shot_made_flag, game_date, htm, vtm) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)', 
    [body[0], body[1], body[2].toString(), body[3].toString(), body[4], body[5].toString(), body[6], body[7].toString(), body[8].toString(), body[9].toString(), body[10], body[11], body[12], body[13], body[14], body[15], body[16].toString(), body[17].toString(), body[18].toString(), body[19].toString(), body[20].toString(), body[21], body[22], body[23]], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(body);
    })
  }



  const createShotBySeason = (request, response) => {
    let season = request.params;
    const body = request.body;
    console.log(body);
    db.query(`INSERT INTO "${season['season']}" (grid_type, game_id, game_event_id, player_id, player_name, team_id, team_name, period, minutes_remaining, seconds_remaining, event_type, action_type, shot_type, shot_zone_basic, shot_zone_area, shot_zone_range, shot_distance, loc_x, loc_y, shot_attempted_flag, shot_made_flag, game_date, htm, vtm) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)`, 
    [body[0], body[1], body[2].toString(), body[3].toString(), body[4], body[5].toString(), body[6], body[7].toString(), body[8].toString(), body[9].toString(), body[10], body[11], body[12], body[13], body[14], body[15], body[16].toString(), body[17].toString(), body[18].toString(), body[19].toString(), body[20].toString(), body[21], body[22], body[23]], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(body);
    })
  }

  module.exports = {
    getShots,
    createShotBySeason,
    createShot,
    getShotsByPlayerLocal,
    getShotsByPlayerBySeasonByGameLocal,
    getShotsByPlayerBySeasonLocal,
    getShotsByPlayerBySeason,
    getShotsBySeasonLocal,
    getShotsBySeason,
    getShotsLocal,
  }