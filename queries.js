const db = require("./pgPool");


const getPlayerIds = (request, response) => {
  db.query('SELECT playerid FROM players ORDER BY playerid ASC', (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)

    response.status(200).json(results.rows)
  })
}

const getPlayers = (request, response) => {
    db.query('SELECT * FROM players ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      console.log(results.rows)

      response.status(200).json(results.rows)
    })
}

const getPlayersNBA = async(request, response) => {
    let players = await require('./public/playersNBA.json');
    response.status(200).send(players);
}

const createPlayersNBA = async(request, response) => {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKKKKKKKKKKKKKK');
    let body = request.body;

    console.log(body);
    console.log(body.length);
    for (let j = 0; j < body.length; j++) {
        console.log(body[j]);
        let jsonBody = JSON.parse(body[j])
        db.query('INSERT INTO "playersNBA" (full_name, first_name, last_name, is_active, playerid) VALUES ($1, $2, $3, $4, $5)', 
            [jsonBody.full_name, jsonBody.first_name, jsonBody.last_name, jsonBody.is_active, jsonBody.id], (error, results) => {
            if (error) {
                throw error
            }
        })
        response.status(201).send();
    }
}

const getPlayerIdWithLastFirst = (request, response) => {
  let {lastName, firstName} = request.params;
  let lastNameEndString = '';
  let firstNameEndString = '';
  for (let i = 1; i < lastName.length; i++) {
    lastNameEndString += lastName[i];
  }
  let last = lastName[0].toUpperCase() + lastNameEndString;
  for (let i = 1; i < firstName.length; i++) {
    firstNameEndString += firstName[i];
  }
  let first = firstName[0].toUpperCase() + firstNameEndString;
  db.query(`SELECT playerid FROM players WHERE lastname = $1 AND firstname = $2`, [last, first], (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).json(results.rows)
  })
}

const getPlayersWithLastFirst = (request, response) => {
  let {lastName, firstName} = request.params;
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
  console.log(playerid);
  console.log(league);
  console.log(seasonyear);
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

const getGamesBySeason = async(request, response) => {
  let season = request.params;
  let games = await require(`./leaguegames${season['season']}.json`);
  response.status(200).send(games);    
}

const getGamesBySeasonLocal = async(request, response) => {
  let season = request.params;
  db.query('SELECT * FROM "leagueGames2015-2016" WHERE season = $1', [season['season']], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}

const getGamesLocal = async(request, response) => {
  for (let i = 0; i < 7; i++) { 
    db.query('SELECT * FROM "leagueGames2015-2016"', [season['season']], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
  }
}

const getShotsBySeason = async(request, response) => {
  let season = request.params;
  console.log(season['season']);
  let shots = await require(`./${season['season']}.json`);
  response.status(200).send(shots);    
}

const getShotsBySeasonLocal = async(request, response) => {
  let season = request.params;
  db.query('SELECT * FROM "2015-2016" WHERE season = $1', [season['season']], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}

const getShotsByPlayerBySeason = async(request, response) => {
  let season = request.params;
  console.log(season['season']);
  let shots = await require(`./${season['season']}.json`);
  response.status(200).send(shots);    
}

const getShotsByPlayerBySeasonLocal = async(request, response) => {
  let { player, season } = request.params;
  let playerid = player.playerid;
  db.query('SELECT * FROM "2015-2016" WHERE playerid = $1 AND season = $2', [playerid, season['season']], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}

const getShotsByPlayerBySeasonByGameLocal = async(request, response) => {
  let { player, season, gameid } = request.params;
  let playerid = player.playerid;
  db.query('SELECT * FROM "2015-2016" WHERE playerid = $1 AND season = $2', [playerid, season['season'], gameid], (error, results) => {
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

const createGamesBySeason = (request, response) => {
  let season = request.params;
  console.log(season);
  const body = request.body;
  console.log(body);
  db.query(`INSERT INTO "leagueGames${season['season']}" (season_id, team_id, team_abbreviation, team_name, game_id, game_date, matchup, wl, min, fgm, fga, fg_pct, fg3m, fg3a, fg3_pct, ftm, fta, ft_pct, oreb, dreb, reb, ast, stl, blk, tov, pf, pts, plus_minus, video_available) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29)`, 
  [body[0], body[1].toString(), body[2], body[3], body[4], body[5], body[6], body[7], body[8].toString(), body[9].toString(), body[10].toString(), body[11].toString(), body[12].toString(), body[13].toString(), body[14].toString(), body[15].toString(), body[16].toString(), body[17].toString(), body[18].toString(), body[19].toString(), body[20].toString(), body[21].toString(), body[22].toString(), body[23].toString(), body[24].toString(), body[25].toString(), body[26].toString(), body[27].toString(), body[28].toString()], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(body);
  })
}

const createShotBySeason = (request, response) => {
  let season = request.params;
  console.log(season);
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

const createPlayerMvpPoints = (request, response) => {
  const body = request.body;
  console.log(body.player[0].playerid);
  console.log(body.mvpPoints);
  console.log(body);
  db.query('INSERT INTO "mvpPoints" (playerid, firstname, lastname, mvppoints, season) VALUES ($1, $2, $3, $4, $5)', [body.player[0].playerid.toString(), body.player[0].firstname, body.player[0].lastname, body.mvpPoints, body.season], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(body);
  })
}

const createPlayerCarmeloPoints = (request, response) => {
  const body = request.body;

  db.query('INSERT INTO "carmeloPts" (playerid, firstname, lastname, carmelopts, season) VALUES ($1, $2, $3, $4, $5)', [body.player[0].playerid.toString(), body.player[0].firstname, body.player[0].lastname, body.carmeloPts, body.season], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(body);
  })
}

const createPlayerHustlePoints = (request, response) => {
  const body = request.body;

  db.query('INSERT INTO "hustleFactor" (playerid, firstname, lastname, hustlepts, season) VALUES ($1, $2, $3, $4, $5)', [body.player[0].playerid.toString(), body.player[0].firstname, body.player[0].lastname, body.hustlePts, body.season], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(body);
  })
}

const getAllFirstLastMvpPointsInSeason = (request, response) => {
  const season = request.params;
  db.query(`SELECT firstname, lastname, mvppoints FROM "mvpPoints" WHERE season = $1 AND mvppoints!='STATISTICS UNAVAILABLE' ORDER BY CAST(mvppoints AS FLOAT) ASC`, [season.season], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAllFirstLastCarmeloPointsInSeason = (request, response) => {
  const season = request.params;
  db.query(`SELECT firstname, lastname, carmelopts FROM "carmeloPts" WHERE season = $1 AND carmelopts!='STATISTICS UNAVAILABLE' ORDER BY CAST(carmelopts AS FLOAT) ASC`, [season.season], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getAllFirstLastHustlePointsInSeason = (request, response) => {
  const season = request.params;
  db.query(`SELECT firstname, lastname, hustlepts FROM "hustleFactor" WHERE season = $1 AND hustlepts!='STATISTICS UNAVAILABLE' ORDER BY CAST(hustlepts AS FLOAT) ASC`, [season.season], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
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
    getPlayersNBA,
    createPlayersNBA,
    getPlayerById,
    getPlayerIds,
    createPlayer,
    createGame,
    createGameInfo,
    getShots,
    getShotsBySeason,
    getShotsByPlayerBySeason,
    createShot,
    createShotBySeason,
    createPlayerMvpPoints,
    createPlayerCarmeloPoints,
    createPlayerHustlePoints,
    deleteDatabase,
    getPlayersWithLastFirst,
    getPlayerSeasonGameStats,
    getPlayerIdWithLastFirst,
    getAllFirstLastMvpPointsInSeason,
    getAllFirstLastCarmeloPointsInSeason,
    getAllFirstLastHustlePointsInSeason,
    getGamesBySeason,
    getShotsBySeasonLocal,
    getShotsByPlayerBySeasonLocal,
    getShotsByPlayerBySeasonByGameLocal,
    createGamesBySeason,
    getShotsByPlayerLocal,
    getShotsLocal,
    getGamesBySeasonLocal,
    getGamesLocal,
}
