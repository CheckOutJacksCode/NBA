const statSubmit = document.getElementById("submit-stat");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const statToGet = document.getElementById("statToGet");
const seasonToGet = document.getElementById("season");
const mvpSubmit = document.getElementById("submit-mvp");
const hustleFactorSubmit = document.getElementById("submit-hustle-factor");
const deepStatToGet = document.getElementById("deepStatToGet");
const deepStatSubmit = document.getElementById("submit-deep-stat");
const clearButton = document.getElementById("clearButton");
const loadUpLocal = document.getElementById("loadButton");
const loadUpGamesLocal = document.getElementById("loadGamesButton");
const loadUpGameInfoLocal = document.getElementById("loadGameInfoButton");

//const getIndividualPlayer = require("./script.js");

const getJsonResponse = async (url) => {
    console.log(url);
    const response = await fetch(url);
    try{
        if (response.ok){
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            return jsonResponse;
        }
    } catch(err){
        console.log(err);
    }
}

const getArrayOfPlayerIdsInEastandWestConferences = async() => {
    let playerIdArray = [];
    const players = await getJsonResponse('/players');
    for (let i = 0; i < players.length; i++) {
        playerIdArray.push(players[i].playerid);
    }
    return playerIdArray;
}


const postPlayer = async(obj) => {
    console.log('wwwwwwwwwwwww');
    const url = '/players';
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(obj),
        })
        if (response.ok) {
            const jsonResponse = response.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log('someone fucked up');
        console.log(error);
    } 
}

const postGame = async(obj) => {
    console.log('tttttttttt');
    const url = '/games';
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(obj),
        })
        if (response.ok) {
            const jsonResponse = response.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log('someone fucked up');
        console.log(error);
    } 
}

const postGameInfo = async(obj, year) => {
    console.log('wwwwwwwwwww');
    const url = '/games/seasonyear/' + year;
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(obj),
        })
        if (response.ok) {
            const jsonResponse = response.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log('someone fucked up');
        console.log(error);
    } 
}

const deleteDatabase = async() => {
    const url = '/database/delete';
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        })
        if (response.ok) {
            const jsonResponse = response.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log('someone fucked up');
        console.log(error);
    }
}

/* uses the players name to retrieve the player Id from the NBA api, to access the statistics
endpoints in the NBA api I had to first supply the id. */
const getIdFromPlayersByName = async(playerLastName, playerFirstName) => {
    let players = await getPlayersByName(playerLastName);
    for (i = 0; i < players.api.players.length; i++) {
        if (players.api.players[i].firstName.toLowerCase() == playerFirstName.toLowerCase()) {
            let IdToReturn = parseInt(players.api.players[i].playerId); 
            return IdToReturn;
        }
    }
    return('garbage');
}

const getIdFromPlayersByNameLocal = async(playerLastName, playerFirstName) => {
    let players = await getJsonResponse(`/players`);
    console.log(players);
    for (i = 0; i < players.length; i++) {
        if (players[i].firstname.toLowerCase() == playerFirstName.toLowerCase() && players[i].lastname.toLowerCase() == playerLastName.toLowerCase()) {
            return players[i].playerid;
        }
    }
}

/* Appends any players' stat to the html table. Can take both regular stats and deep stats. */
rowIndex = 1;
const appendPlayerAndStat = async(player, stat, statAverage) => {
    let row = playerInfoTable.insertRow(rowIndex);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = player.firstName + ' ' + player.lastName;
    if (isNaN(statAverage)) {
        cell2.innerHTML = 'Statistics Unavailable'
    } else {
        cell2.innerHTML = stat + ":" + ` ${statAverage}`;
    }
    rowIndex += 1;
}

const getTeamsInConference = async(conference) => {
    let teams = await fetch('https://api-nba-v1.p.rapidapi.com/teams/confName/' + conference, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8f81231b96mshfe26030fc9f1ac5p1954edjsnfaacfd979769',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    })
    if (teams.ok) {
        let jsonTeamsInConference = teams.json();
        return jsonTeamsInConference;
    }
}

const getTeamIdsFromConference = async(conference) => {
    let idArray = [];
    let teams = await getTeamsInConference(conference);
    for (let i = 0; i < teams.api.teams.length; i++) {
        idArray.push(teams.api.teams[i].teamId);
    }
    return idArray;
}

const getPlayersByTeamId = async(teamId) => {
    let players = await fetch('https://api-nba-v1.p.rapidapi.com/players/teamId/' + teamId, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8f81231b96mshfe26030fc9f1ac5p1954edjsnfaacfd979769',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    })
    if (players.ok) {
        let jsonPlayers = players.json();
        return jsonPlayers;    
    }
}

const getStatsFromPlayerId = async(playerId) => {
    let stats = await fetch('https://api-nba-v1.p.rapidapi.com/statistics/players/playerId/' + playerId, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8f81231b96mshfe26030fc9f1ac5p1954edjsnfaacfd979769',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    })
    if (stats.ok) {
        let jsonStats = stats.json();
        return jsonStats;    
    }
}

const getTodaysStatsFromPlayerId = async(playerId) => {
    let today = DateTime.now()
    let stats = await fetch('https://api-nba-v1.p.rapidapi.com/statistics/players/playerId/' + playerId, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8f81231b96mshfe26030fc9f1ac5p1954edjsnfaacfd979769',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    })
    if (stats.ok) {
        let jsonStats = stats.json();
        return jsonStats;    
    }
}

const getPlayersInStandardLeague = async() => {
    let players = await fetch('https://api-nba-v1.p.rapidapi.com/players/league/standard/', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8f81231b96mshfe26030fc9f1ac5p1954edjsnfaacfd979769',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    })
    if (players.ok) {
        let jsonPlayers = players.json();
        return jsonPlayers;
    }
}
  
const getPlayersByNameLocal = async(playerLastName) => {
    let players = await getJsonResponse('/players/lastName/' + playerLastName);
    return players;
}

/* Retrieves entire desired player object and returns to user. */
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

const getGameInfo = async(year) => {
    let games = await fetch('https://api-nba-v1.p.rapidapi.com/games/seasonYear/' + year, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key': '8f81231b96mshfe26030fc9f1ac5p1954edjsnfaacfd979769'
        }
    })
    if (games.ok) {
        let jsonGames = games.json();
        return jsonGames;
    }
}



/* Get the season average for any player, for any stat, for any one of the years of data
provided by the NBA api */
const getSeasonStatAvg = async(stat, year, playerId) => {
    let gameDetailsArray = await getPlayerStandardGameDetails(year, playerId);
    let statTotal = await getSeasonTotalOfStat(stat, gameDetailsArray);
    let gamesPlayed = await getGamesPlayedInSeason(gameDetailsArray);
    let statAverage = statTotal / gamesPlayed;
    return Number.parseFloat(statAverage).toFixed(2);
}
/*
FOR EVERY STANDARD LEAGUE GAME FOR EVERY PLAYER
GET SEASON TOTAL OF STAT USING STANDARD LEAGUE GAME ARRAY FROM PREVIOUS STEP
GET GAMES PLAYED BY CHECKING IF 'MINS' ARE NOT NULL FOR PLAYER IN EACH GAME LINE
STAT AVERAGE = STEP 2 / STEP 3

GAME LINE ARRAY ===== FOR EVERY GAME IN GAMES DATABASE WHERE PLAYERID = THE PLAYERID, AND LEAGUE = STANDARD
FOR EACH GAME IN ARRAY, ADD UP TOTAL OF STAT SELECTED
FOR EACH GAME IN ARRAY, IF 'MIN' !== NULL, COUNT++, RETURN GAME COUNT
STAT AVERAGE = STAT TOTAL / GAMESPLAYED ARRAY.

*/



const getSeasonStatAvgLocal = async(stat, year, playerId) => {
    let league = 'standard';
    let gameDetailsArray = await getJsonResponse(`/games/${playerId}/${league}/${year}`);
    console.log(gameDetailsArray);
    let statTotal = await getSeasonTotalOfStat(stat, gameDetailsArray);
    let gamesPlayed = await getGamesPlayedInSeason(gameDetailsArray);
    let statAverage = statTotal / gamesPlayed;
    return Number.parseFloat(statAverage).toFixed(2);
}

/* Returns the season total of any stat) */
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

/* MVP points logic */
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
    let fgp = await getSeasonStatAvg('fgp', year, playerId);
    let mvpPoints = (.15 * parseInt(ppg)) + (.07 * parseInt(totReb)) + (.06 * parseInt(assists)) + (.125 * parseInt(steals)) - (.125 * parseInt(turnovers)) + (.3 * parseInt(plusMinus)) + (.02 * parseInt(fgp));
    console.log(plusMinus);
    if (!mvpPoints) {
        return 'STATISTICS UNAVAILABLE'
    }
    return mvpPoints.toFixed(2);
}

/* Hustle Factor logic */
const getHustleFactor = async(year, playerId) => {
    let hustleFactor;
    let offRebPg = await getSeasonStatAvg('offReb', year, playerId)
    let stl = await getSeasonStatAvg('steals', year, playerId)
    let blk = await getSeasonStatAvg('blocks', year, playerId)
    let plusMinus = await getSeasonStatAvg('plusMinus', year, playerId);
    //let games = await getPlayerStandardGameDetails(playerId);
    //let gamesPlayed = games.length;
    let player = await getIndividualPlayer(playerId)
    console.log(player)
    let height = parseFloat(player.api.players[0].heightInMeters)
    console.log(height)
    if (height < 2.057) {
        hustleFactor = (.2 * parseFloat(offRebPg)) + (.4 * parseFloat(stl)) + (.2 * parseFloat(blk)) + (.2 * parseFloat(plusMinus))
    } else if (height === null) {
        hustleFactor = (.25 * parseFloat(offRebPg)) + (.35 * parseFloat(stl)) + (.2 * parseFloat(blk)) + (.2 * parseFloat(plusMinus))
    } else {
        hustleFactor = (.3 * parseFloat(offRebPg)) + (.3 * parseFloat(stl)) + (.3 * parseFloat(blk)) + (.1 * parseFloat(plusMinus))
    }
    console.log(hustleFactor)
    return hustleFactor.toFixed(2);
}

/* Carmelo logic. The higher your carmelo factor, the more effecient and gritty
of a player you are, adds fgp and hustlefactor */
const getCarmeloFactor = async(year, playerId) => {
    let carmeloFactor;
    let fgp = await getSeasonStatAvg('fgp', year, playerId);
    let hustleFactor = await getHustleFactor(year, playerId);
    carmeloFactor = -1 * (.3 * (100 - parseFloat(fgp))/10) + (.7 * hustleFactor);
    return carmeloFactor.toFixed(2);
}

/* Retrieves player object */
const getPlayer = async() => {
    let playerFirstName = firstName.value;
    let playerLastName = lastName.value;
    let id = await getIdFromPlayersByName(playerLastName, playerFirstName);
    let player = await getIndividualPlayer(id);
    return player;
}

const getStatsArray = async(playerIdArray) => {
    let statsArray = [];
    for (let i = 0; i < playerIdArray.length; i++) {
        let stats = await getStatsFromPlayerId(playerIdArray[i]);
        statsArray.push(stats);
    }
    return statsArray;
}


/* Start up function, provides functionality for submit buttons. */
const onStartUp = function() {
    mvpSubmit.onclick = async() => {
        let id = await getIdFromPlayersByName(lastName.value, firstName.value);
        let mvpPoints = await getMvpPoints(seasonToGet.value, id);
        let player = await getIndividualPlayer(id);
        appendPlayerAndStat(player.api.players[0], 'MVP Points: ', mvpPoints);
    }

    statSubmit.onclick = async() => {
        let stat = statToGet.value;
        console.log(stat)
        let playerFirstName = firstName.value;
        let playerLastName = lastName.value;
        let season = seasonToGet.value;
        let id = await getIdFromPlayersByNameLocal(playerLastName, playerFirstName);
        console.log(id);
        let statAverage = await getSeasonStatAvgLocal(stat, season, id);
        console.log(statAverage);
        let player = await getIndividualPlayer(id);
        console.log(player);
        appendPlayerAndStat(player.api.players[0], stat, statAverage);
    }
    /*THIRD-PART STAT-SUBMIT BUTTON DEACTIVATED FOR NOW
    statSubmit.onclick = async() => {
        let stat = statToGet.value;
        console.log(stat)
        let playerFirstName = firstName.value;
        let playerLastName = lastName.value;
        let season = seasonToGet.value;
        let id = await getIdFromPlayersByName(playerLastName, playerFirstName);
        let statAverage = await getSeasonStatAvg(stat, season, id);
        let player = await getIndividualPlayer(id);
        appendPlayerAndStat(player.api.players[0], stat, statAverage);
    }
    */

    /*
    hustleFactorSubmit.onclick = async() => {
        let id = await getIdFromPlayersByName(lastName.value, firstName.value);
        console.log(id)
        let hustleFactor = await getHustleFactor(seasonToGet.value, id)
        let player = await getIndividualPlayer(id);
        console.log(hustleFactor)
        appendPlayerAndStat(player.api.players[0], 'Hustle Factor: ', hustleFactor)
    }*/

    deepStatSubmit.onclick = async() => {
        let stat = deepStatToGet.value;
        let season = seasonToGet.value;
        let id = await getIdFromPlayersByName(lastName.value, firstName.value)
        let statPoints;
        if (stat === "Hustle Factor") {
            statPoints = await getHustleFactor(season, id);
        } else if (stat === "Carmelo Factor") {
            statPoints = await getCarmeloFactor(season, id);
        } else {
            statPoints = await getQualityShotPercentage(season, id);
        }
        let player = await getIndividualPlayer(id)
        appendPlayerAndStat(player.api.players[0], stat, statPoints);
    }

    clearButton.onclick = async() => {
        playerInfoTable.innerHTML = '';
        rowIndex = 0;
    }

    loadUpLocal.onclick = async() => {
        let conference = 'East';
        let teamIds = await getTeamIdsFromConference(conference);
        console.log(teamIds);
        for (let j = 0; j < teamIds.length; j++) {
            let players = await getPlayersByTeamId(teamIds[j]);
            for (let i = 0; i < players.api.players.length; i++) {
                console.log(players.api.players[i])
                let player = await postPlayer(players.api.players[i]);
            }
        }
    }
    loadUpGamesLocal.onclick = async() => {
        let playerIdArray = await getArrayOfPlayerIdsInEastandWestConferences();
        console.log(playerIdArray);
        console.log(playerIdArray.length);
        let statsArray = await getStatsArray(playerIdArray);
        console.log(statsArray);
        for (let i = 0; i < statsArray.length; i ++) {
            console.log('HELLLLOOOOO');
            for (let j = 0; j < statsArray[i].api.statistics.length; j++) {
                let game = await postGame(statsArray[i].api.statistics[j]);
            }
        }
    }
    loadUpGameInfoLocal.onclick = async() => {
        let years = ['2015', '2016', '2017', '2018', '2019', '2020', '2021'];
        for (let i = 0; i < years.length; i++) {
            let games = await getGameInfo(years[i]);
            for (let j = 0; j < games.api.games.length; j++) {
                let results = await postGameInfo(games.api.games[j]);
            }
        } 
    }
}

const loadUpLocalFunction = async() => {
    let conference = 'East';
    let teamIds = await getTeamIdsFromConference(conference);
    console.log(teamIds);
    for (let j = 0; j < teamIds.length; j++) {
        let players = await getPlayersByTeamId(teamIds[j]);
        for (let i = 0; i < players.api.players.length; i++) {
            console.log(players.api.players[i])
            let player = await postPlayer(players.api.players[i]);
        }
    }
}

const loadUpGamesLocalFunction = async() => {
    let playerIdArray = await getArrayOfPlayerIdsInEastandWestConferences();
    console.log(playerIdArray);
    console.log(playerIdArray.length);
    let statsArray = await getStatsArray(playerIdArray);
    console.log(statsArray);
    for (let i = 0; i < statsArray.length; i ++) {
        console.log('HELLLLOOOOO');
        for (let j = 0; j < statsArray[i].api.statistics.length; j++) {
            let game = await postGame(statsArray[i].api.statistics[j]);
        }
    }
}

const loadUpGameInfoLocalFunction = async() => {
    let years = ['2015', '2016', '2017', '2018', '2019', '2020', '2021'];
    for (let i = 0; i < years.length; i++) {
        let games = await getGameInfo(years[i]);
        for (let j = 0; j < games.api.games.length; j++) {
            let results = await postGameInfo(games.api.games[j]);
        }
    } 
}

const updateDatabase = async() => {
    let results = await deleteDatabase();
    await loadUpLocalFunction();
    await loadUpGamesLocalFunction();
    await loadUpGameInfoLocalFunction();
    console.log('ENTIRE DATABASE REFRESHED');
}

// checks if one day has passed.
let localStorage = {"yourapp_date": null}; 
const hasOneDayPassed = () => {
  // get today's date. eg: "7/37/2007"
  var date = new Date().toLocaleDateString();

  // if there's a date in localstorage and it's equal to the above: 
  // inferring a day has yet to pass since both dates are equal.
  if( localStorage.yourapp_date == date ) 
      return false;

  // this portion of logic occurs when a day has passed
  localStorage.yourapp_date = date;
  return true;
}


// some function which should run once a day
const runOncePerDay = async() => {
  if( !hasOneDayPassed() ) return false;

  // your code below
  await updateDatabase();
}

//UNCOMMENT THIS CODE AND THE DATABASE WILL DELETE ITSELF AND REPLENISH EVERY TIME YOU START THE SERVER
//runOncePerDay(); // run the code
onStartUp();