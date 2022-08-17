const playerId = document.getElementById("playerId");
const playerIdSubmit = document.getElementById("playerId-submit");
const playerInfoTable = document.getElementById("player-info");

const getJsonResponse = async (url) => {
    console.log(url);
    const response = await fetch(url);
    try{
        if (response.ok){
            const jsonResponse = await response.json();
            return jsonResponse;
        }
    } catch(err){
        console.log(err);
    }
}


//GET PLAYER IDS FROM LOCAL DATABASE
const getArrayOfPlayerIdsInEastandWestConferences = async() => {
    const players = await getJsonResponse('/playerIds');
    console.log(players);
    return players;
}


const getIndividualPlayer = async(id) => {
    let jsonResponse;
    const response = await fetch('https://api-nba-v1.p.rapidapi.com/players/playerId/' + id, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
          'x-rapidapi-key': '8f81231b96mshfe26030fc9f1ac5p1954edjsnfaacfd979769'
        }
    });
    if (response.ok) {
        jsonResponse = response.json();
        return jsonResponse;
    }
}

let rowIndex = 1;
const appendIndividualPlayer = async(player) => {
    let year = 2021;
    let ppg = await getPPG(year, player.playerId);
    let defReb = await getDefRebAverage(year, player.playerId);
    let offReb = await getOffRebAverage(year, player.playerId);
    let assists = await getAssistsAverage(year, player.playerId);
    let row = playerInfoTable.insertRow(rowIndex);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    cell1.innerHTML = `${player.firstName}`;
    cell2.innerHTML = `${player.lastName}`;
    cell3.innerHTML = `${ppg}`;
    cell4.innerHTML = `${defReb}`;
    cell5.innerHTML = `${offReb}`;
    cell6.innerHTML = `${assists}`;
    rowIndex += 1;
}
//NEED TO 



/* This script basically makes sure I am only counting statistics from the regular NBA season. */
//games/seasonYear/
//2021 where league = 'standard'
//compile a list of game Id's where the season is 2021 and the league is 'standard'
//then use the game id's and loop through statistics/players/playerId

//get list of games in 2021 where the league is 'standard'
const getGamesBySeason = async(year) => {
    try {    
        let gamesResponse = await fetch('https://api-nba-v1.p.rapidapi.com/games/seasonYear/' + year, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
                'x-rapidapi-key': '8f81231b96mshfe26030fc9f1ac5p1954edjsnfaacfd979769'
            }
        })
        if (gamesResponse.ok) {
            let jsonResponse = gamesResponse.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log(error);
    }
}

//make sure all games are in the standard league
const getStandardGames = async(year) => {
    let standardGamesArray = [];
    const games = await getGamesBySeason(year);
    for(let i = 0; i < games.api.games.length; i++) {
        if (games.api.games[i].league === 'standard') {
            standardGamesArray.push(games.api.games[i]);
        }
    }
    return standardGamesArray
}

const getSeasonGameIdList = async(year) => {
    let gamesArray = await getStandardGames(year);
    let gameIdList = [];
    gamesArray.forEach(game => {
        gameIdList.push(game.gameId);
    })
    return gameIdList;
}

//get individual players' statistics

const getIndividualPlayersStats = async(playerId) => {
    try {
        let player = await fetch('https://api-nba-v1.p.rapidapi.com/statistics/players/playerId/' + playerId, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
                'x-rapidapi-key': '8f81231b96mshfe26030fc9f1ac5p1954edjsnfaacfd979769'
            }
        })
        if (player.ok) {
            let jsonPlayer = player.json();
            return jsonPlayer;
        }
    } catch (error) {
        console.log(error);
    }
}

/* This is the actual function that returns the array of all of the games' statistics
from just the regular season. */
const getPlayerStandardGameDetails = async(year, playerId) => {
    let playerStandardGameDetails = [];
    let gameIdList = await getSeasonGameIdList(year);
    let player = await getIndividualPlayersStats(playerId);
    
    for (let i = 0; i < gameIdList.length; i++) {
        for (let j = 0; j < player.api.statistics.length; j++) {
            if (gameIdList[i] === player.api.statistics[j].gameId) {
                playerStandardGameDetails.push(player.api.statistics[j]);
            }
        }
    }
    
    return playerStandardGameDetails;
}

const getTotalPointsInSeason = function(gameDetailsArray) {
    let totalPoints = 0;
    for (let i = 0; i < gameDetailsArray.length; i++) {
        if (gameDetailsArray[i].min) {
            totalPoints += parseInt(gameDetailsArray[i].points);
        }
    }
    return totalPoints;
}

const getGamesPlayedInSeason = function(gameDetailsArray) {
    let gamesPlayed = 0;
    for (let i = 0; i < gameDetailsArray.length; i++) {
        if (gameDetailsArray[i].min) {
            gamesPlayed += 1;
        }
    }
    return gamesPlayed;
}

const getPPG = async(year, playerId) => {
    let gameDetailsArray = await getPlayerStandardGameDetails(year, playerId);
    let totalPoints = await getTotalPointsInSeason(gameDetailsArray);
    let gamesPlayed = await getGamesPlayedInSeason(gameDetailsArray);
    let ppg = totalPoints / gamesPlayed;
    return "ppg: " + Number.parseFloat(ppg).toFixed(2);
}

const getTotalDefensiveRebounds = async(gameDetailsArray) => {
    let totalDefensiveRebounds = 0;
    for (let i = 0; i < gameDetailsArray.length; i++) {
        if (gameDetailsArray[i].min) {
            totalDefensiveRebounds += parseInt(gameDetailsArray[i].defReb);
        }
    }
    return totalDefensiveRebounds;
}

const getDefRebAverage = async(year, playerId) => {
    let gameDetailsArray = await getPlayerStandardGameDetails(year, playerId);
    let totalDefReb = await getTotalDefensiveRebounds(gameDetailsArray);
    let gamesPlayed = await getGamesPlayedInSeason(gameDetailsArray);
    let defRebAvg = totalDefReb / gamesPlayed;
    return "defensive rebounds: " + Number.parseFloat(defRebAvg).toFixed(2);
}

const getTotalOffensiveRebounds = async(gameDetailsArray) => {
    let totalOffensiveRebounds = 0;
    for (let i = 0; i < gameDetailsArray.length; i++) {
        if (gameDetailsArray[i].min) {
            totalOffensiveRebounds += parseInt(gameDetailsArray[i].offReb);
        }
    }
    return totalOffensiveRebounds;
}

const getOffRebAverage = async(year, playerId) => {
    let gameDetailsArray = await getPlayerStandardGameDetails(year, playerId);
    let totalOffReb = await getTotalOffensiveRebounds(gameDetailsArray);
    let gamesPlayed = await getGamesPlayedInSeason(gameDetailsArray);
    let offRebAvg = totalOffReb / gamesPlayed;
    return "offensive rebounds: " + Number.parseFloat(offRebAvg).toFixed(2);
}

const getTotalAssists = async(gameDetailsArray) => {
    let totalAssists = 0;
    for (let i = 0; i < gameDetailsArray.length; i++) {
        if (gameDetailsArray[i].min) {
            totalAssists += parseInt(gameDetailsArray[i].assists)
        }
    }
    return totalAssists;
}

const getAssistsAverage = async(year, playerId) => {
    let gameDetailsArray = await getPlayerStandardGameDetails(year, playerId);
    let totalAssists = await getTotalAssists(gameDetailsArray);
    let gamesPlayed = await getGamesPlayedInSeason(gameDetailsArray);
    let assistsAvg = totalAssists / gamesPlayed;
    return "assists: " + Number.parseFloat(assistsAvg).toFixed(2);
}

/*playerIdSubmit.onclick = async() => {
    let id = playerId.value;
    let response = await getIndividualPlayer(id);
    appendIndividualPlayer(response.api.players[0]);
}*/
//NEXT STEPS:
/*DISPLAY A LIST (STATIC) OF ALL THE AVAILABLE STATS YOU CAN GET.**************************************
-HAVE AN INPUT TEXT FIELD FOR WHAT 'STAT' YOU WANT. (FROM THE STATIC LIST OF STATS);********************
-HAVE AN INPUT FIELD FOR FIRST NAME;
-HAVE AN INPUT FIELD FOR LAST NAME;
-HAVE AN INPUT FIELD FOR PLAYER ID;
-WHEN A USER SELECTS A DESIRED PLAYER AND STAT, DISPLAY THE PLAYER'S PICTURE AND STATISTIC ON THE PAGE;
-COME UP WITH YOUR OWN FORMULA FOR WEIGHTING THE MOST SIGNIFICANT STAT;
-MAKE A 'GNARLIEST DUDE' STAT, 'SLOWEST GUY IN THE NFL', 'BIGGEST COMPLAINER', etc.
*/

/* MVP points logic */
/*NOW YOU HAVE THE PLAYER ID.
CALL GETSTANDARDPLAYERDETAILS*/
const getMvpPoints = async(year, playerId) => {
    let ppg = await getSeasonStatAvgLocal('ppg', year, playerId);
    console.log(ppg)
    let totReb = await getSeasonStatAvgLocal('totreb', year, playerId);
    console.log(totReb);
    let assists = await getSeasonStatAvgLocal('assists', year, playerId);
    console.log(assists);
    let steals = await getSeasonStatAvgLocal('steals', year, playerId);
    console.log(steals);
    let turnovers = await getSeasonStatAvgLocal('turnovers', year, playerId);
    console.log(turnovers);
    let plusMinus = await getSeasonStatAvgLocal('plusminus', year, playerId);
    console.log(plusMinus);
    let fgp = await getSeasonStatAvgLocal('fgp', year, playerId);
    console.log(fgp);
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
    console.log(playerId)
    console.log(year)
    let offRebPg = await getSeasonStatAvgLocal('offreb', year, playerId)
    let stl = await getSeasonStatAvgLocal('steals', year, playerId)
    let blk = await getSeasonStatAvgLocal('blocks', year, playerId)
    let plusMinus = await getSeasonStatAvgLocal('plusminus', year, playerId);
    //let games = await getPlayerStandardGameDetails(playerId);
    //let gamesPlayed = games.length;
    let player = await getIndividualPlayerLocal(playerId)
    console.log(player)
    let height = parseFloat(player[0].heightinmeters)
    console.log(height)
    if (height < 2.057) {
        hustleFactor = (.2 * parseFloat(offRebPg)) + (.4 * parseFloat(stl)) + (.2 * parseFloat(blk)) + (.2 * parseFloat(plusMinus))
    } else if (height === null) {
        hustleFactor = (.25 * parseFloat(offRebPg)) + (.35 * parseFloat(stl)) + (.2 * parseFloat(blk)) + (.2 * parseFloat(plusMinus))
    } else {
        hustleFactor = (.3 * parseFloat(offRebPg)) + (.3 * parseFloat(stl)) + (.3 * parseFloat(blk)) + (.1 * parseFloat(plusMinus))
    }
    if (!hustleFactor) {
        return 'STATISTICS UNAVAILABLE'
    }
    console.log(hustleFactor)
    return hustleFactor.toFixed(2);
}

/* Carmelo logic. The higher your carmelo factor, the more effecient and gritty
of a player you are, adds fgp and hustlefactor */

const getCarmeloFactor = async(year, playerId) => {
    let carmeloFactor;
    let fgp = await getSeasonStatAvgLocal('fgp', year, playerId);
    let hustleFactor = await getHustleFactor(year, playerId);
    carmeloFactor = -1 * (.3 * (100 - parseFloat(fgp))/10) + (.7 * hustleFactor);
    if (!carmeloFactor) {
        return 'STATISTICS UNAVAILABLE'
    }
    return carmeloFactor.toFixed(2);
}

/*const getCarmeloFactor = async(year, playerId) => {
    let carmeloFactor;
    let fgp = await getSeasonStatAvg('fgp', year, playerId);
    let hustleFactor = await getHustleFactor(year, playerId);
    carmeloFactor = -1 * (.3 * (100 - parseFloat(fgp))/10) + (.7 * hustleFactor);
    return carmeloFactor.toFixed(2);
}
*/

const getSeasonStatAvgLocal = async(stat, year, playerId) => {
    let league = 'standard';
    console.log(playerId);
    let gameDetailsArray = await getJsonResponse(`/games/` + playerId + '/' + league + '/' + year);
    console.log(gameDetailsArray);
    console.log(stat);
    let statTotal = await getSeasonTotalOfStat(stat.toLowerCase(), gameDetailsArray);
    console.log(statTotal)
    let gamesPlayed = await getGamesPlayedInSeason(gameDetailsArray);
    let statAverage = statTotal / gamesPlayed;
    return Number.parseFloat(statAverage).toFixed(2);
}

/* Returns the season total of any stat) */
const getSeasonTotalOfStat = async(stat, gameDetailsArray) => {
    let statTotal = 0;
    if (stat === 'ppg') {
        console.log('YOTOTOTOOOOTORORORORTOOREWEOE')
        stat = 'points';
    }
    for (let i = 0; i < gameDetailsArray.length; i++) {
        if (gameDetailsArray[i].min) {
            statTotal += parseInt(gameDetailsArray[i][stat]);
        }
    }
    return statTotal;
}

const getIndividualPlayerLocal = async(playerid) => {
    console.log(playerid);
    const player = await getJsonResponse(`/local/players/` + playerid);
    console.log(player);
    return player;
}

const getPlayersByLastNameLocal = async(playerLastName) => {
    let players = await getJsonResponse('/players/lastName/' + playerLastName);
    return players;
}
const getIdFromPlayersByNameLocal = async(playerLastName, playerFirstName) => {
    let playerid = await getJsonResponse(`/local/players/playerid/` + playerLastName + '/' + playerFirstName);
    console.log(playerid);
    return playerid;
}