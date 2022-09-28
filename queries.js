const db = require("./pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');


const getPlayerIds = (request, response) => {
  db.query('SELECT playerid FROM players ORDER BY playerid ASC', (error, results) => {
    if (error) {
      throw error
    }
    //console.log(results.rows)

    response.status(200).json(results.rows)
  })
}

const getPlayers = (request, response) => {
    db.query('SELECT * FROM players ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      //console.log(results.rows)

      response.status(200).json(results.rows)
    })
}

const getPlayersJson = async(request, response) => {
    let players = await require('./playersJson.json');
    response.status(200).send(players);
}
const getPlayersNBA = async(request, response) => {
    let players = await require('./playersNBA.json');
    response.status(200).send(players);
}

const createPlayersNBA = async(request, response) => {
    //console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKKKKKKKKKKKKKK');
    let body = request.body;
    console.log(body);
    db.query('INSERT INTO "playersNBA" (full_name, first_name, last_name, is_active, playerid) VALUES ($1, $2, $3, $4, $5)', 
        [body.full_name, body.first_name, body.last_name, body.is_active, body.player_id], (error, results) => {
        if (error) {
            throw error
        }
    })
    response.status(201).send(body);
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

    response.status(200).json(results.rows)
  })
}

const getPlayerSeasonGameStats = async(request, response) => {
  let {playerid, league, seasonyear} = request.params;

  let year = seasonyear.substring(0, 4);

  db.query(`SELECT * FROM games
            INNER JOIN gameinfo 
            ON games.gameid=gameinfo.gameid
            WHERE playerid = $1 AND league = $2 AND gameinfo.seasonyear = $3`, [playerid, league, year], (error, results) => {
    if (error) {
      throw error
    }
    //console.log(results.rows)

    response.status(200).json(results.rows)
  })
}

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


const getPlayerById = async(request, response) => {
    let {playerid} = request.params;
    //console.log('muffins')
    //console.log(playerid);
    db.query('SELECT * FROM players WHERE playerid = $1', [playerid], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createPlayer = (request, response) => {
    const body = request.body;
    //console.log(body.firstName);
    //console.log(body.lastName);
    db.query('INSERT INTO players (firstName, lastName, teamId, yearsPro, collegeName, country, playerId, dateOfBirth, affiliation, startNba, heightInMeters, weightInKilograms, leagues) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', 
    [body.firstName, body.lastName, body.teamId, body.yearsPro, body.collegeName, body.country, body.playerId, body.dateOfBirth, body.affiliation, body.startNba, body.heightInMeters, body.weightInKilograms, body.leagues], (error, results) => {
      if (error) {
        throw error
      }
      //console.log(results);
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

const getLeagueHustleStatsBySeason = async(request, response) => {
  let season = request.params;
  console.log(season);
  console.log(season.season);
  let games = await require(`./leaguehustlestatsplayer${season.season}.json`);
  response.status(200).send(games);    
}

const getGamesBySeasonLocal = async(request, response) => {
  let season = request.params;
  db.query(`SELECT * FROM "leagueGames${season["season"]}"`, (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}

const getGameIdGameDateMatchupBySeasonDropDownLocal = async(request, response) => {
  let { player, season } = request.params;
  //console.log(player);
  //console.log(season);
  
  db.query(`SELECT DISTINCT "leagueGames${season}".game_id, "leagueGames${season}".game_date, matchup FROM "leagueGames${season}"
            INNER JOIN "${season}"
            ON "leagueGames${season}".game_id="${season}".game_id
            WHERE "${season}".player_name = $1
            ORDER BY "leagueGames${season}".game_date`, [`${player}`], (error, results) => {
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
  //console.log(season['season']);
  let shots = await require(`./${season['season']}.json`);
  response.status(200).send(shots);    
}
/*
const getBoxScoreByGameLocal = async(request, response) => {
  let season = request.params;
  db.query(`SELECT * FROM "${season["season"]}"`, (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}
*/
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

const createGamesBySeason = (request, response) => {
  let season = request.params;
  //console.log(season);
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
  db.query('INSERT INTO "mvpPoints" (playerid, firstname, lastname, mvppoints, season) VALUES ($1, $2, $3, $4, $5)', [body.player[0].playerid.toString(), body.player[0].first_name, body.player[0].last_name, body.mvpPoints, body.season], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(body);
  })
}

const createPlayerCarmeloPoints = (request, response) => {
  const body = request.body;

  db.query('INSERT INTO "carmeloPts" (playerid, firstname, lastname, carmelopts, season) VALUES ($1, $2, $3, $4, $5)', [body.player[0].playerid.toString(), body.player[0].first_name, body.player[0].last_name, body.carmeloPts, body.season], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(body);
  })
}

const createPlayerHustlePoints = (request, response) => {
  const body = request.body;

  db.query('INSERT INTO "hustleFactor" (playerid, firstname, lastname, hustlepts, season) VALUES ($1, $2, $3, $4, $5)', [body.player[0].playerid.toString(), body.player[0].first_name, body.player[0].last_name, body.hustlePts, body.season], (error, results) => {
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

const getGamesFromJson = async(request, response) => {
  let games = await require(`./gamesJson.json`);
  console.log(games);
  response.status(200).send(games);
}

const createGame = (request, response) => {
    const body = request.body;
    console.log('boom')
    db.query('INSERT INTO games (gameId, teamId, points, position, min, fgm, fga, fgp, ftm, fta, ftp, tpm, tpa, tpp, offReb, defReb, totReb, assists, pFouls, steals, turnovers, blocks, plusMinus, playerId) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)', 
    [body.gameId, body.teamId, body.points, body.position, body.min, body.fgm, body.fga, body.fgp, body.ftm, body.fta, body.ftp, body.tpm, body.tpa, body.tpp, body.offReb, body.defReb, body.totReb, body.assists, body.pFouls, body.steals, body.turnovers, body.blocks, body.plusMinus, body.playerId], (error, results) => {
      if (error) {
        throw error;
      }
      //console.log(results);
      response.status(201).send(body);
    });
}

const createGameCloud = (request, response) => {
  let body = request.body;
  console.log('boomshakalaka');
  console.log(body);
  body = {
    gameid: `${body[1]}`,
    teamid: `${body[2]}`,
    points: `${body[3]}`,
    position: `${body[4]}`,
    min: `${body[5]}`,
    fgm: `${body[6]}`,
    fga: `${body[7]}`,
    fgp: `${body[8]}`,
    ftm: `${body[9]}`,
    fta: body[10],
    ftp: `${body[11]}`,
    tpm: `${body[12]}`,
    tpa: `${body[13]}`,
    tpp: `${body[14]}`,
    offreb: `${body[15]}`,
    defreb: `${body[16]}`,
    totreb: body[17],
    assists: `${body[18]}`,
    pfouls: `${body[19]}`,
    steals: `${body[20]}`,
    turnovers: `${body[21]}`,
    blocks: `${body[22]}`,
    plusminus: `${body[23]}`,
    playerid: `${body[24]}`, 
  }
  console.log(body)
  console.log(body.gameid);
  db.query('INSERT INTO games (gameid, teamid, points, position, min, fgm, fga, fgp, ftm, fta, ftp, tpm, tpa, tpp, offreb, defreb, totreb, assists, pfouls, steals, turnovers, blocks, plusminus, playerid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)', 
  [body.gameid, body.teamid, body.points, body.position, body.min, body.fgm, body.fga, body.fgp, body.ftm, body.fta, body.ftp, body.tpm, body.tpa, body.tpp, body.offreb, body.defreb, body.totreb, body.assists, body.pfouls, body.steals, body.turnovers, body.blocks, body.plusminus, body.playerid], (error, results) => {
    if (error) {
      throw error;
    }
    //console.log(results);
    response.status(201).send(body);
  });
}

const createGameInfo = (request, response) => {
    const body = request.body;
    //console.log(body);
    db.query('INSERT INTO gameinfo (seasonYear, league, gameId, startTimeUTC, endTimeUTC, arena, city, country, clock, gameDuration, currentPeriod, halftime, endOfPeriod, seasonStage, statusShortGame, vTeam, hTeam) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)',
    [body.seasonYear, body.league, body.gameId, body.startTimeUTC, body.endTimeUTC, body.arena, body.city, body.country, body.clock, body.gameDuration, body.currentPeriod, body.halftime, body.endOfPeriod, body.seasonStage, body.statusShortGame, body.vTeam, body.hTeam], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(body);
    });
}

const createGameInfoCloud = (request, response) => {
  let body = request.body;
  console.log('woo-aa');
  console.log(body);
  body = {
    seasonyear: `${body[1]}`,
    league: `${body[2]}`,
    gameid: `${body[3]}`,
    starttimeutc: `${body[4]}`,
    endtimeutc: `${body[5]}`,
    arena: `${body[6]}`,
    city: `${body[7]}`,
    country: `${body[8]}`,
    clock: `${body[9]}`,
    gameduration: body[10],
    currentperiod: `${body[11]}`,
    halftime: `${body[12]}`,
    endofperiod: `${body[13]}`,
    seasonstage: `${body[14]}`,
    statusshortgame: `${body[15]}`,
    vteam: body[16],
    hteam: body[17],
  }
  console.log(body)
  console.log(body.gameid);
  db.query('INSERT INTO gameinfo (seasonyear, league, gameid, starttimeutc, endtimeutc, arena, city, country, clock, gameduration, currentperiod, halftime, endofperiod, seasonstage, statusshortgame, vteam, hteam) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)',
    [body.seasonyear, body.league, body.gameid, body.starttimeutc, body.endtimeutc, body.arena, body.city, body.country, body.clock, body.gameduration, body.currentperiod, body.halftime, body.endofperiod, body.seasonstage, body.statusshortgame, body.vteam, body.hteam], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(201).send(body);
    });
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

const createBoxScores = (request, response) => {
  const body = request.body;
  let season = request.params;
  console.log(season.season)
  db.query(`INSERT INTO "boxscores${season.season}" (game_id, team_id, team_abbreviation, team_city, player_id, player_name, nickname, start_position, comment, min, e_off_rating, off_rating, e_def_rating, def_rating, e_net_rating, net_rating, ast_pct, ast_tov, ast_ratio, oreb_pct, dreb_pct, reb_pct, tm_tov_pct, efg_pct, ts_pct, usg_pct, e_usg_pct, e_pace, pace, pace_per40, poss, pie) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32)`,
  [body.GAME_ID, body.TEAM_ID, body.TEAM_ABBREVIATION, body.TEAM_CITY, body.PLAYER_ID, body.PLAYER_NAME, body.NICKNAME, body.START_POSITION, body.COMMENT, body.MIN, body.E_OFF_RATING, body.OFF_RATING, body.E_DEF_RATING, body.DEF_RATING, body.E_NET_RATING, body.NET_RATING, body.AST_PCT, body.AST_TOV, body.AST_RATIO, body.OREB_PCT, body.DREB_PCT, body.REB_PCT, body.TM_TOV_PCT, body.EFG_PCT, body.TS_PCT, body.USG_PCT, body.E_USG_PCT, body.E_PACE, body.PACE, body.PACE_PER40, body.POSS, body.PIE], (error, results) => {
      if (error) {
          throw error;
      }
      response.status(201).send(body);
  });
}

const getLocalGamesByGameByPlayerPublic = async(request, response) => {
  let {playerid, gameid} = request.params;
  //let playerid = player.playerid;
  db.query('SELECT * FROM games WHERE playerid = $1 AND gameid = $2', [playerid, gameid], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}

const getGameIdPublic = async(request, response) => {
  let {playerid, league, seasonyear, shotsgameid} = request.params;
  
  let year = seasonyear.substring(0, 4);

  db.query(`SELECT games.gameid FROM games
            INNER JOIN gameinfo
            ON games.gameid = gameinfo.gameid
            WHERE games.playerid = $1`, [playerid], (error, results) => {
    if (error) {
      throw error
    }
    //console.log(results.rows)

    response.status(200).json(results.rows)
  })
}

const getGamesByPlayer = async(request, response) => {
  let playerid = request.params;
  console.log(playerid);
  db.query(`SELECT * FROM games
            WHERE games.playerid = $1`, [playerid.playerid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getGameInfoByGameId = async(request, response) => {
  let gameid = request.params;
  db.query(`SELECT * FROM gameinfo
            WHERE gameinfo.gameid = $1`, [gameid.gameid], (error, results) => {
    if (error) {
      throw error
  }
    response.status(200).json(results.rows)
  })
}

const getVTeamHTeam = async(request, response) => {
  console.log(request.params);
  let playerid = request.params;
  console.log('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
  console.log(playerid)
  db.query(`SELECT vteam, hteam FROM gameinfo
            INNER JOIN games 
            ON gameinfo.gameid = games.gameid
            WHERE games.playerid = $1`, [playerid.playerid], (error, results) => {
    if (error) {
      throw error
    }
//    console.log(results.rows)

    response.status(200).json(results.rows)
  })
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
const boxScoreLoad = (request, response) => {

    let season = request.params;
    console.log(season);
    const data = [];
    fs.createReadStream(`./boxscores${season.season}.csv`)
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
        //console.log(data); 
        response.status(201).send(data);
    })
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
const seasonRegularPlayerStatsLoad = (request, response) => {

  const data = [];
  fs.createReadStream(`./seasonregularplayerstats.csv`)
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


const createLeagueHustleStatsBySeason = (request, response) => {
  let season = request.params;
  console.log(season);
  const body = request.body;
  console.log(body);
  db.query(`INSERT INTO "leagueHustleStatsPlayer${season['season']}" (player_id, player_name, team_id, team_abbreviation, age, g, min, contested_shots, contested_shots_2pt, contested_shots_3pt, deflections, charges_drawn, screen_assists, screen_ast_pts, off_loose_balls_recovered, def_loose_balls_recovered, loose_balls_recovered, pct_loose_balls_recovered_off, pct_loose_balls_recovered_def, off_boxouts, def_boxouts, box_out_player_team_rebs, box_out_player_rebs, box_outs, pct_box_outs_off, pct_box_outs_def, pct_box_outs_team_reb, pct_box_outs_reb) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28)`, 
  [body[0], body[1].toString(), body[2], body[3], body[4], body[5], body[6], body[7], body[8].toString(), body[9].toString(), body[10].toString(), body[11].toString(), body[12].toString(), body[13].toString(), body[14].toString(), body[15].toString(), body[16].toString(), body[17].toString(), body[18].toString(), body[19].toString(), body[20].toString(), body[21].toString(), body[22].toString(), body[23].toString(), body[24].toString(), body[25].toString(), body[26].toString(), body[27].toString()], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(body);
  })
}
/*
const writePlayersCSV = (request, response) => {
  let players = request.body;
  const jsonString = JSON.stringify(players);
  fs.writeFile('./playersJson.json', jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
  })
}
*/
        
const createPlayerCloud = (request, response) => {
  let body = request.body;
  //console.log(body.firstName);
  //console.log(body.lastName);
  body = {
    firstname: `${body[1]}`,
    lastname: `${body[2]}`,
    affiliation: `${body[3]}`,
    collegename: `${body[4]}`,
    country: `${body[5]}`,
    dateofbirth: `${body[6]}`,
    heightinmeters: `${body[7]}`,
    weightinkilograms: `${body[8]}`,
    yearspro: `${body[9]}`,
    leagues: body[10],
    teamid: `${body[11]}`,
    playerid: `${body[12]}`,
    startnba: `${body[13]}`,
  }
  console.log(body)

  db.query('INSERT INTO players (firstname, lastname, teamid, yearspro, collegename, country, playerid, dateofbirth, affiliation, startnba, heightinmeters, weightinkilograms, leagues) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', 
  [body.firstname, body.lastname, body.teamid, body.yearspro, body.collegename, body.country, body.playerid, body.dateofbirth, body.affiliation, body.startnba, body.heightinmeters, body.weightinkilograms, body.leagues], (error, results) => {
    if (error) {
      throw error
    }
    //console.log(results);
    response.status(201).send(body);
  })
}

const getGameInfoFromJson = async(request, response) => {
  let gameinfo = await require(`./gameinfo.json`);
  console.log(gameinfo);
  response.status(200).send(gameinfo);
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

const getOfficialPlayerIdWithLastFirst = (request, response) => {
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
  db.query(`SELECT playerid FROM "playersNBA" WHERE last_name = $1 AND first_name = $2`, [last, first], (error, results) => {
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

const getPlayerByIdOfficial = async(request, response) => {
  let {playerid} = request.params;
  console.log('muffins')
  //console.log(playerid);
  db.query('SELECT * FROM "playersNBA" WHERE playerid = $1', [playerid], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}

const getTeamNames = async(request, response) => {
  
  db.query('SELECT DISTINCT team_name FROM "leagueGames2021-2022"', (error, results) => {
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

const getTeamIdFromName = async(request, response) => {
  let teamname = request.params;
  console.log(teamname);
  db.query('SELECT DISTINCT team_id FROM "leagueGames2021-2022" WHERE team_name = $1', [teamname.teamname], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}

const createSeasonRegularPlayerStatsTotals = (request, response) => {
  const body = request.body;
  console.log(body);
  db.query(`INSERT INTO "seasonTotalsRegularSeason" (player_id, season_id, league_id, team_id, team_abbreviation, player_age, gp, gs, min, fgm, fga, fg_pct, fg3m, fg3a, fg3_pct, ftm, fta, ft_pct, oreb, dreb, reb, ast, stl, blk, tov, pf, pts) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)`, 
  [body.PLAYER_ID, body.SEASON_ID, body.LEAGUE_ID, body.TEAM_ID, body.TEAM_ABBREVIATION, body.PLAYER_AGE, body.GP, body.GS, body.MIN, body.FGM, body.FGA, body.FG_PCT, body.FG3M, body.FG3A, body.FG3_PCT, body.FTM, body.FTA, body.FT_PCT, body.OREB, body.DREB, body.REB, body.AST, body.STL, body.BLK, body.TOV, body.PF, body.PTS], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(body);
  })
}

const getRegularSeasonStatLines = async(request, response) => {
  let { playerid } = request.params;
  console.log(playerid);
  db.query('SELECT * FROM "seasonTotalsRegularSeason" WHERE player_id = $1', [playerid], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}

const getRegularSeasonStatLinesBySeason = async(request, response) => {
  let { playerid, season } = request.params;
  console.log(playerid);
  console.log(season);
  db.query('SELECT * FROM "seasonTotalsRegularSeason" WHERE player_id = $1 and season_id = $2', [playerid, season], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}

const getShotSeasonsFromPlayerId = async(request, response) => {
  let { playerid } = request.params;
  console.log(playerid);
  db.query('SELECT DISTINCT season_id FROM "seasonTotalsRegularSeason" WHERE player_id = $1', [playerid], (error, results) => {
      if (error) {
          throw error
      }
      response.status(200).json(results.rows)
  })
}

const getBoxScoreFourFactorsFromCSV = (request, response) => {
  let {season} = request.params;
  console.log(season);
  const data = [];
  fs.createReadStream(`./juicystats/boxscorefourfactors${season}.csv`)
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
      response.status(201).send(data);
  })
}

const createBoxScoreFourFactors = (request, response) => {
  const body = request.body;
  const season = request.params;
  console.log(season);
  db.query(`INSERT INTO "boxscorefourfactors${season.season}" (game_id, team_id, team_abbreviation, team_city, player_id, player_name, nickname, start_position, comment, min, efg_pct, fta_rate, tm_tov_pct, oreb_pct, opp_efg_pct, opp_fta_rate, opp_tov_pct, opp_oreb_pct) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`, 
  [body.GAME_ID, body.TEAM_ID, body.TEAM_ABBREVIATION, body.TEAM_CITY, body.PLAYER_ID, body.PLAYER_NAME, body.NICKNAME, body.START_POSITION, body.COMMENT, body.MIN, body.EFG_PCT, body.FTA_RATE, body.TM_TOV_PCT, body.OREB_PCT, body.OPP_EFG_PCT, body.OPP_FTA_RATE, body.OPP_TOV_PCT, body.OPP_OREB_PCT], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(body);
  })
}

const getBoxScoreFourFactorsTeamsFromCSV = (request, response) => {
  let {season} = request.params;
  console.log(season);
  const data = [];
  fs.createReadStream(`./juicystats/boxscorefourfactorsteams${season}.csv`)
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
      //console.log("parsed csv data:"); 
      response.status(201).send(data);
  })
}

const createBoxScoreFourFactorsTeams = (request, response) => {
  const body = request.body;
  const season = request.params;
  console.log(season);
  db.query(`INSERT INTO "boxscorefourfactorsteams${season.season}" (game_id, team_id, team_name, team_abbreviation, team_city, min, efg_pct, fta_rate, tm_tov_pct, oreb_pct, opp_efg_pct, opp_fta_rate, opp_tov_pct, opp_oreb_pct) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`, 
  [body.GAME_ID, body.TEAM_ID, body.TEAM_NAME, body.TEAM_ABBREVIATION, body.TEAM_CITY, body.MIN, body.EFG_PCT, body.FTA_RATE, body.TM_TOV_PCT, body.OREB_PCT, body.OPP_EFG_PCT, body.OPP_FTA_RATE, body.OPP_TOV_PCT, body.OPP_OREB_PCT], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(body);
  })
}

const getBoxScoreMiscFromCSV = (request, response) => {
  let {season} = request.params;
  console.log(season);
  const data = [];
  fs.createReadStream(`./juicystats/boxscoremisc${season}.csv`)
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
      //console.log("parsed csv data:"); 
      response.status(201).send(data);
  })
}

const createBoxScoreMisc = (request, response) => {
  const body = request.body;
  const season = request.params;
  console.log(season);
  db.query(`INSERT INTO "boxscoremisc${season.season}" (game_id, team_id, team_abbreviation, team_city, player_id, player_name, nickname, start_position, comment, min, pts_off_tov, pts_2nd_chance, pts_fb, pts_paint, opp_pts_off_tov, opp_pts_2nd_chance, opp_pts_fb, opp_pts_paint, blk, blka, pf, pfd) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)`, 
  [body.GAME_ID, body.TEAM_ID, body.TEAM_ABBREVIATION, body.TEAM_CITY, body.PLAYER_ID, body.PLAYER_NAME, body.NICKNAME, body.START_POSITION, body.COMMENT, body.MIN, body.PTS_OFF_TOV, body.PTS_2ND_CHANCE, body.PTS_FB, body.PTS_PAINT, body.OPP_PTS_OFF_TOV, body.OPP_PTS_2ND_CHANCE, body.OPP_PTS_FB, body.OPP_PTS_PAINT, body.BLK, body.BLKA, body.PF, body.PFD], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(body);
  })
}

const getBoxScoreMiscTeamsFromCSV = (request, response) => {
  let {season} = request.params;
  console.log(season);
  const data = [];
  fs.createReadStream(`./juicystats/boxscoremiscteams${season}.csv`)
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
      //console.log("parsed csv data:"); 
      response.status(201).send(data);
  })
}

const createBoxScoreMiscTeams = (request, response) => {
  const body = request.body;
  const season = request.params;
  console.log(season);
  db.query(`INSERT INTO "boxscoremiscteams${season.season}" (game_id, team_id, team_name, team_abbreviation, team_city, min, pts_off_tov, pts_2nd_chance, pts_fb, pts_paint, opp_pts_off_tov, opp_pts_2nd_chance, opp_pts_fb, opp_pts_paint, blk, blka, pf, pfd) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`, 
  [body.GAME_ID, body.TEAM_ID, body.TEAM_NAME, body.TEAM_ABBREVIATION, body.TEAM_CITY, body.MIN, body.PTS_OFF_TOV, body.PTS_2ND_CHANCE, body.PTS_FB, body.PTS_PAINT, body.OPP_PTS_OFF_TOV, body.OPP_PTS_2ND_CHANCE, body.OPP_PTS_FB, body.OPP_PTS_PAINT, body.BLK, body.BLKA, body.PF, body.PFD], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(body);
  })
}

const getBoxScorePlayerTrackerFromCSV = (request, response) => {
  let {season} = request.params;
  console.log(season);
  const data = [];
  fs.createReadStream(`./juicystats/boxscoreplayertracker${season}.csv`)
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
      //console.log("parsed csv data:"); 
      response.status(201).send(data);
  })
}

const createBoxScorePlayerTracker = (request, response) => {
  const body = request.body;
  const season = request.params;
  console.log(season);
  db.query(`INSERT INTO "boxscoreplayertracker${season.season}" (game_id, team_id, team_abbreviation, team_city, player_id, player_name, start_position, comment, min, spd, dist, orbc, drbc, rbc, tchs, sast, ftast, pass, ast, cfgm, cfga, cfg_pct, ufgm, ufga, ufg_pct, fg_pct, dfgm, dfga, dfg_pct) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29)`, 
  [body.GAME_ID, body.TEAM_ID, body.TEAM_ABBREVIATION, body.TEAM_CITY, body.PLAYER_ID, body.PLAYER_NAME, body.START_POSITION, body.COMMENT, body.MIN, body.SPD, body.DIST, body.ORBC, body.DRBC, body.RBC, body.TCHS, body.SAST, body.FTAST, body.PASS, body.AST, body.CFGM, body.CFGA, body.CFG_PCT, body.UFGM, body.UFGA, body.UFG_PCT, body.FG_PCT, body.DFGM, body.DFGA, body.DFG_PCT], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(body);
  })
}

const getBoxScorePlayerTrackerTeamsFromCSV = (request, response) => {
  let {season} = request.params;
  console.log(season);
  const data = [];
  fs.createReadStream(`./juicystats/boxscoreplayertrackerteams${season}.csv`)
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
      //console.log("parsed csv data:"); 
      response.status(201).send(data);
  })
}

const createBoxScorePlayerTrackerTeams = (request, response) => {
  const body = request.body;
  const season = request.params;
  console.log(season);
  db.query(`INSERT INTO "boxscoreplayertrackerteams${season.season}" (game_id, team_id, team_name, team_abbreviation, team_city, min, dist, orbc, drbc, rbc, tchs, sast, ftast, pass, ast, cfgm, cfga, cfg_pct, ufgm, ufga, ufg_pct, fg_pct, dfgm, dfga, dfg_pct) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)`, 
  [body.GAME_ID, body.TEAM_ID, body.TEAM_ABBREVIATION, body.TEAM_NAME, body.TEAM_CITY, body.MIN, body.DIST, body.ORBC, body.DRBC, body.RBC, body.TCHS, body.SAST, body.FTAST, body.PASS, body.AST, body.CFGM, body.CFGA, body.CFG_PCT, body.UFGM, body.UFGA, body.UFG_PCT, body.FG_PCT, body.DFGM, body.DFGA, body.DFG_PCT], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(body);
  })
}

const getLeagueDashLineupsFromJson = async(request, response) => {
    let stats = await require(`./juicystats/leaguedashlineups2015-2016.json`);
    console.log(stats);
    response.status(200).send(stats);
}

const createLeagueDashLineups = (request, response) => {
  const body = request.body;
  const season = request.params;
  console.log(season);
  db.query(`INSERT INTO "leaguedashlineups${season.season}" (group_set, group_id, group_name, team_id, team_abbreviation, gp, w, l, w_pct, min, fgm, fga, fg_pct, fg3m, fg3a, fg3_pct, ftm, fta, ft_pct, oreb, dreb, reb, ast, tov, stl, blk, blka, pf, pfd, pts, plus_minus, gp_rank, w_rank, l_rank, w_pct_rank, min_rank, fgm_rank, fga_rank, fg_pct_rank, fg3m_rank, fg3a_rank, fg3_pct_rank, ftm_rank, fta_rank, ft_pct_rank, oreb_rank, dreb_rank, reb_rank, ast_rank, tov_rank, stl_rank, blk_rank, blka_rank, pf_rank, pfd_rank, pts_rank, plus_minus_rank) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57)`, 
  [body[0], body[1], body[2], body[3].toString(), body[4], body[5].toString(), body[6].toString(), body[7].toString(), body[8].toString(), body[9].toString(), body[10].toString(), body[11].toString(), body[12].toString(), body[13].toString(), body[14].toString(), body[15].toString(), body[16].toString(), body[17].toString(), body[18].toString(), body[19].toString(), body[20].toString(), body[21].toString(), body[22].toString(), body[23].toString(), body[24].toString(), body[25].toString(), body[26].toString(), body[27].toString(), body[28].toString(), body[29].toString(), body[30].toString(), body[31].toString(), body[32].toString(), body[33].toString(), body[34].toString(), body[35].toString(), body[36].toString(), body[37].toString(), body[38].toString(), body[39].toString(), body[40].toString(), body[41].toString(), body[42].toString(), body[43].toString(), body[44].toString(), body[45].toString(), body[46].toString(), body[47].toString(), body[48].toString(), body[49].toString(), body[50].toString(), body[51].toString(), body[52].toString(), body[53].toString(), body[54].toString(), body[55].toString(), body[56].toString()], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(body);
  })
}

const getLeagueDashOppPtShotFromJson = async(request, response) => {
  let stats = await require(`./juicystats/leaguedashoppptshot2015-2016.json`);
  console.log(stats);
  response.status(200).send(stats);
}

const createLeagueDashOppPtShot = (request, response) => {
  const body = request.body;
  const season = request.params;
  console.log(season);
  db.query(`INSERT INTO "leaguedashoppptshot${season.season}" (team_id, team_name, team_abbreviation, gp, g, fga_frequency, fgm, fga, fg_pct, efg_pct, fg2a_frequency, fg2m, fg2a, fg2_pct, fg3_frequency, fg3m, fg3a, fg3_pct) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`, 
  [body[0], body[1], body[2], body[3].toString(), body[4], body[5].toString(), body[6].toString(), body[7].toString(), body[8].toString(), body[9].toString(), body[10].toString(), body[11].toString(), body[12].toString(), body[13].toString(), body[14].toString(), body[15].toString(), body[16].toString(), body[17].toString()], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(body);
  })
}

const getLeagueDashPlayerClutchFromJson = async(request, response) => {
  let stats = await require(`./juicystats/leaguedashplayerclutch2015-2016.json`);
  console.log(stats);
  response.status(200).send(stats);
}

const createLeagueDashPlayerClutch = (request, response) => {
  const body = request.body;
  const season = request.params;
  console.log(season);
  db.query(`INSERT INTO "leaguedashplayerclutch${season.season}" (group_set, player_id, player_name, team_id, team_abbreviation, age, gp, w, l, w_pct, min, fgm, fga, fg_pct, fg3m, fg3a, fg3_pct, ftm, fta, ft_pct, oreb, dreb, reb, ast, tov, stl, blk, blka, pf, pfd, pts, plus_minus, nba_fantasy_pts, dd2, td3, gp_rank, w_rank, l_rank, w_pct_rank, min_rank, fgm_rank, fga_rank, fg_pct_rank, fg3m_rank, fg3a_rank, fg3_pct_rank, ftm_rank, fta_rank, ft_pct_rank, oreb_rank, dreb_rank, reb_rank, ast_rank, tov_rank, stl_rank, blk_rank, blka_rank, pf_rank, pfd_rank, pts_rank, plus_minus_rank, nba_fantasy_pts_rank, dd2_rank, td3_rank, cfid, cfparams) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63, $64, $65, $66)`, 
  [body[0], body[1], body[2], body[4].toString(), body[5], body[6].toString(), body[7].toString(), body[8].toString(), body[9].toString(), body[10].toString(), body[11].toString(), body[12].toString(), body[13].toString(), body[14].toString(), body[15].toString(), body[16].toString(), body[17].toString(), body[18].toString(), body[19].toString(), body[20].toString(), body[21].toString(), body[22].toString(), body[23].toString(), body[24].toString(), body[25].toString(), body[26].toString(), body[27].toString(), body[28].toString(), body[29].toString(), body[30].toString(), body[31].toString(), body[32].toString(), body[33].toString(), body[34].toString(), body[35].toString(), body[36].toString(), body[37].toString(), body[38].toString(), body[39].toString(), body[40].toString(), body[41].toString(), body[42].toString(), body[43].toString(), body[44].toString(), body[45].toString(), body[46].toString(), body[47].toString(), body[48].toString(), body[49].toString(), body[50].toString(), body[51].toString(), body[52].toString(), body[53].toString(), body[54].toString(), body[55].toString(), body[56].toString(), body[57].toString(), body[58].toString(), body[59].toString(), body[60].toString(), body[61].toString(), body[62].toString(), body[63].toString(), body[64].toString(), body[65].toString(), body[66].toString()], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(body);
  })
}

const getLeagueDashPlayerPtShotFromJson = async(request, response) => {
  let stats = await require(`./juicystats/leaguedashplayerptshot${season}.json`);
  console.log(stats);
  response.status(200).send(stats);
}

const createLeagueDashPlayerPtShot = (request, response) => {
  const body = request.body;
  const season = request.params;
  console.log(season);
  for (let i = 0; i < body.length; i++) {
    if (!body[i]) {
      body[i] = 'null';
    }
  }
  db.query(`INSERT INTO "leaguedashplayerptshot${season.season}" (player_id, player_name, player_last_team_id, player_last_team_abbreviation, age, gp, g, fga_frequency, fgm, fga, fg_pct, efg_pct, fg2a_frequency, fg2m, fg2a, fg2_pct, fg3_frequency, fg3m, fg3a, fg3_pct) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)`, 
  [body[0].toString(), body[1], body[2].toString(), body[3], body[4].toString(), body[5].toString(), body[6].toString(), body[7].toString(), body[8].toString(), body[9].toString(), body[10].toString(), body[11].toString(), body[12].toString(), body[13].toString(), body[14].toString(), body[15].toString(), body[16].toString(), body[17].toString(), body[18].toString(), body[19].toString()], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(body);
  })
}

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
    getGameIdGameDateMatchupBySeasonDropDownLocal,
    getLocalGamesByGameByPlayerPublic,
    getGameIdPublic,
    createBoxScores,
    boxScoreLoad,
    getVTeamHTeam,
    getGamesByPlayer,
    getGameInfoByGameId,
    createLeagueHustleStatsBySeason,
    getLeagueHustleStatsBySeason,
    createPlayerCloud,
    getPlayersJson,
    createGameCloud,
    getGamesFromJson,
    createGameInfoCloud,
    getGameInfoFromJson,
    boxScoreTraditionalLoad,
    createBoxScoresTraditional,
    getBoxScoresTraditional,
    getOfficialPlayerIdWithLastFirst,
    getPlayerSeasonGameStatsOfficial,
    getOfficialPlayerIdList,
    getPlayerByIdOfficial,
    getTeamNames,
    getTeamPlayersFromTeamId,
    getTeamIdFromName,
    seasonRegularPlayerStatsLoad,
    createSeasonRegularPlayerStatsTotals,
    getRegularSeasonStatLines,
    getRegularSeasonStatLinesBySeason,
    getShotSeasonsFromPlayerId,
    getBoxScoreFourFactorsFromCSV,
    createBoxScoreFourFactors,
    getBoxScoreFourFactorsTeamsFromCSV,
    createBoxScoreFourFactorsTeams,
    getBoxScoreMiscFromCSV,
    createBoxScoreMisc,
    getBoxScoreMiscTeamsFromCSV,
    createBoxScoreMiscTeams,
    getBoxScorePlayerTrackerFromCSV,
    createBoxScorePlayerTracker,
    getBoxScorePlayerTrackerTeamsFromCSV,
    createBoxScorePlayerTrackerTeams,
    getLeagueDashLineupsFromJson,
    createLeagueDashLineups,
    getLeagueDashOppPtShotFromJson,
    createLeagueDashOppPtShot,
    getLeagueDashPlayerClutchFromJson,
    createLeagueDashPlayerClutch,
    getLeagueDashPlayerPtShotFromJson,
    createLeagueDashPlayerPtShot,
}
