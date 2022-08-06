const db = require("./pgPool");

const getPlayers = (request, response) => {
    db.query('SELECT * FROM players ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rows)

      response.status(200).json(results.rows)
    })
}

const getPlayerIdWithLastFirst = (request, response) => {
  let {lastName, firstName} = request.params;
  console.log(lastName)
  console.log(firstName)
  db.query(`SELECT playerid FROM players WHERE lastname = $1 AND firstname = $2`, [lastName, firstName], (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)

    response.status(200).json(results.rows)
  })
}

const getPlayersWithLastFirst = (request, response) => {
  let {lastName, firstName} = request.params;
  console.log(lastName)
  console.log(firstName)
  db.query(`SELECT * FROM players WHERE lastname = $1 AND firstname = $2`, [lastName, firstName], (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)

    response.status(200).json(results.rows)
  })
}

const getPlayerSeasonGameStats = async(request, response) => {
  let {playerid, league, seasonyear} = request.params;
  db.query(`SELECT * FROM games
            INNER JOIN gameinfo 
            ON games.gameid=gameinfo.gameid
            WHERE playerid = $1 AND league = $2 AND seasonyear = $3`, [playerid, league, seasonyear], (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)

    response.status(200).json(results.rows)
  })
}

const getPlayerById = async(request, response) => {
    let {playerid} = request.params;
    console.log('muffins')
    console.log(playerid);
    db.query('SELECT * FROM players WHERE playerid = $1', [playerid], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createPlayer = (request, response) => {
    const body = request.body;
    console.log(body.firstName);
    console.log(body.lastName);
    db.query('INSERT INTO players (firstName, lastName, teamId, yearsPro, collegeName, country, playerId, dateOfBirth, affiliation, startNba, heightInMeters, weightInKilograms, leagues) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', 
    [body.firstName, body.lastName, body.teamId, body.yearsPro, body.collegeName, body.country, body.playerId, body.dateOfBirth, body.affiliation, body.startNba, body.heightInMeters, body.weightInKilograms, body.leagues], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results);
      response.status(201).send(body);
    })
}

const getShots = async(request, response) => {
  console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB')
  let shotsArray = [];
  let years = ['2015-2016', '2016-2017', '2017-2018', '2018-2019', '2019-2020', '2020-2021', '2021-2022'];
  for (let i = 0; i < years.length; i++) {
      let shots = await require(`./${years[i]}.json`);
      shotsArray.push(shots);
  }
  response.status(200).send(shotsArray);    
}

const createShot = (request, response) => {
  const body = request.body;

  console.log(body);
  console.log('HKHHHHHHHHHHHHHHHHHHHHKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKHHHHHHHHHHHHHHHHHHHHHHH')
  db.query('INSERT INTO shotchartdetail (grid_type, game_id, game_event_id, player_id, player_name, team_id, team_name, period, minutes_remaining, seconds_remaining, event_type, action_type, shot_type, shot_zone_basic, shot_zone_area, shot_zone_range, shot_distance, loc_x, loc_y, shot_attempted_flag, shot_made_flag, game_date, htm, vtm) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)', 
  [body[0], body[1], body[2].toString(), body[3].toString(), body[4], body[5].toString(), body[6], body[7].toString(), body[8].toString(), body[9].toString(), body[10], body[11], body[12], body[13], body[14], body[15], body[16].toString(), body[17].toString(), body[18].toString(), body[19].toString(), body[20].toString(), body[21], body[22], body[23]], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(body);
  })
}

const createGame = (request, response) => {
    const body = request.body;
    console.log(body);
    db.query('INSERT INTO games (gameId, teamId, points, position, min, fgm, fga, fgp, ftm, fta, ftp, tpm, tpa, tpp, offReb, defReb, totReb, assists, pFouls, steals, turnovers, blocks, plusMinus, playerId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)', 
    [body.gameId, body.teamId, body.points, body.position, body.min, body.fgm, body.fga, body.fgp, body.ftm, body.fta, body.ftp, body.tpm, body.tpa, body.tpp, body.offReb, body.defReb, body.totReb, body.assists, body.pFouls, body.steals, body.turnovers, body.blocks, body.plusMinus, body.playerId], (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results);
      response.status(201).send(body);
    });
}

const createGameInfo = (request, response) => {
    const body = request.body;
    console.log(body);
    db.query('INSERT INTO gameinfo (seasonYear, league, gameId, startTimeUTC, endTimeUTC, arena, city, country, clock, gameDuration, currentPeriod, halftime, endOfPeriod, seasonStage, statusShortGame, vTeam, hTeam) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)',
    [body.seasonYear, body.league, body.gameId, body.startTimeUTC, body.endTimeUTC, body.arena, body.city, body.country, body.clock, body.gameDuration, body.currentPeriod, body.halftime, body.endOfPeriod, body.seasonStage, body.statusShortGame, body.vTeam, body.hTeam], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(body);
    });
}

const deleteDatabase = (request, response) => {
    db.query('DELETE FROM players', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send('deletion worked on players');
    });
    db.query('DELETE FROM games', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send('deletion worked on games');
    });
    db.query('DELETE FROM gameinfo', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send('deletion worked on gameinfo');
    });
}

/*
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const body = request.body
    console.log(body);
    db.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [body.name, body.email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(body);
      }
    )
}
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    db.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send()
    })
}

*/
module.exports = {
    getPlayers,
    getPlayerById,
    createPlayer,
    createGame,
    createGameInfo,
    getShots,
    createShot,
    deleteDatabase,
    getPlayersWithLastFirst,
    getPlayerSeasonGameStats,
    getPlayerIdWithLastFirst,
}
