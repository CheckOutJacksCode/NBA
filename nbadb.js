const getIdFromPlayersByName = async(playerLastName, playerFirstName) => {
  let players = await getPlayersByName(playerLastName);
  for (i = 0; i < players.api.players.length; i++) {
      if (players.api.players[i].firstName === playerFirstName) {
          let IdToReturn = parseInt(players.api.players[i].playerId); 
          return IdToReturn;
      }
  }
  return('garbage');
}

const getPlayersByName = async(playerLastName) => {
  let players = await fetch('https://api-nba-v1.p.rapidapi.com/players/lastName/' + playerLastName, {
      method: 'GET',
      headers: {
          'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
          'x-rapidapi-key': '8f81231b96mshfe26030fc9f1ac5p1954edjsnfaacfd979769'
      }
  })
  if (players.ok) {
      let jsonPlayers = players.json();
      return jsonPlayers;
  }
}


const getSeasonStatAvg = async(stat, year, playerId) => {
  let gameDetailsArray = await getPlayerStandardGameDetails(year, playerId);
  let statTotal = await getSeasonTotalOfStat(stat, gameDetailsArray);
  let gamesPlayed = await getGamesPlayedInSeason(gameDetailsArray);
  let statAverage = statTotal / gamesPlayed;
  return Number.parseFloat(statAverage).toFixed(2);
}

const getSeasonTotalOfStat = async(stat, gameDetailsArray) => {
  let statTotal = 0;
  if (stat === 'ppg') {
      stat = 'points';
  }
  for (let i = 0; i < gameDetailsArray.length; i++) {
      if (gameDetailsArray[i].min) {
          statTotal += parseInt(gameDetailsArray[i][stat]);
      }
  }
  return statTotal;
}

/*NOW YOU HAVE THE PLAYER ID.
CALL GETSTANDARDPLAYERDETAILS*/
const getMvpPoints = async(year, playerId) => {
  const gameDetailsArray = getPlayerStandardGameDetails(year, playerId);
  let ppg = await getSeasonStatAvg('ppg', year, playerId);
  let totReb = await getSeasonStatAvg('totReb', year, playerId);
  let assists = await getSeasonStatAvg('assists', year, playerId);
  let steals = await getSeasonStatAvg('steals', year, playerId);
  let turnovers = await getSeasonStatAvg('turnovers', year, playerId);
  let plusMinus = await getSeasonStatAvg('plusMinus', year, playerId);
  let fgp = await getSeasonStatAvg('fgp', year, playerId);;
  let mvpPoints = (.15 * parseInt(ppg)) + (.07 * parseInt(totReb)) + (.06 * parseInt(assists)) + (.125 * parseInt(steals)) - (.125 * parseInt(turnovers)) + (.3 * parseInt(plusMinus)) + (.02 * parseInt(fgp));
  console.log(plusMinus);
  return mvpPoints;
}

const getPlayer = async() => {
  let playerFirstName = firstName.value;
  let playerLastName = lastName.value;
  let id = await getIdFromPlayersByName(playerLastName, playerFirstName);
  let player = await getIndividualPlayer(id);
  return player;
}

module.exports = { getPlayer, getIdFromPlayersByName, getMvpPoints, getSeasonStatAvg, getSeasonTotalOfStat, getPlayersByName, }