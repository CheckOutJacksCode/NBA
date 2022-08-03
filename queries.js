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

const getPlayersWithFirstLast = (request, response) => {
  let lastName = request.lastName;
  let firstName = request.firstName;
  db.query(`SELECT * FROM players WHERE firstname=${firstName} AND lastname=${lastName} ORDER BY id ASC`, (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)

    response.status(200).json(results.rows)
  })
}

const getPlayerStandardGamesLocal = async(request, response) => {
  let playerId = request.playerId;
  let league = request.league;
  let year = request.year;
  db.query(`SELECT * FROM games
            INNER JOIN gameinfo 
            ON games.gameid=gameinfo.gameid
            WHERE playerid=${playerId} AND league=${league} AND seasonyear=${year};`, (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows)

    response.status(200).json(results.rows)
  })
}

const getPlayerById = async(request, response) => {
    let id = request.params.id;
    console.log(typeof id);
    let idAsInt = parseInt(id);
    console.log(typeof idAsInt);
    if (isNaN(idAsInt)) {
        response.status(404).send("user not found");
        return;
    }
    db.query('SELECT * FROM users WHERE id = $1', [idAsInt], (error, results) => {
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
    deleteDatabase,
    getPlayersWithFirstLast,
    getPlayerStandardGamesLocal,
}
