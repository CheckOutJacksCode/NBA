const db = require("../pgPool");
const fs = require("fs");
const { parse } = require("csv-parse");
const createCsvWriter = require('csv-writer');

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
  console.log(last)
  console.log(first)
  db.query(`SELECT playerid FROM "playersNBA" WHERE last_name = $1 AND first_name = $2`, [last, first], (error, results) => {
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

const getOfficialPlayerIdWithFullName = (request, response) => {
  let {name} = request.params;

  db.query(`SELECT playerid FROM "playersNBA" WHERE full_name = $1`, [name], (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).json(results.rows)
  })
}

module.exports = {
    createPlayersNBA,
    getOfficialPlayerIdWithLastFirst,
    getPlayersNBA,
    getPlayerByIdOfficial,
    getOfficialPlayerIdWithFullName,
}