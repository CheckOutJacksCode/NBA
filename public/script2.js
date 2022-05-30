const statSubmit = document.getElementById("submit-stat");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const statToGet = document.getElementById("statToGet");
const seasonToGet = document.getElementById("season");
const mvpSubmit = document.getElementById("submit-mvp");
const hustleFactorSubmit = document.getElementById("submit-hustle-factor")
const deepStatToGet = document.getElementById("deepStatToGet");
const deepStatSubmit = document.getElementById("submit-deep-stat")
//const getIndividualPlayer = require("./script.js");

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


/* Appends any players' stat to the html table. Can take both regular stats and deep stats. */
rowIndex = 1;
const appendPlayerAndStat = async(player, stat, statAverage) => {
    let row = playerInfoTable.insertRow(rowIndex);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = `${player.firstName}`;
    cell2.innerHTML = `${player.lastName}` + ' - ';
    if (isNaN(statAverage)) {
        cell3.innerHTML = 'Statistics Unavailable'
    } else {
        cell3.innerHTML = stat + ":" + ` ${statAverage}`;
    }
    rowIndex += 1;
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

/* Get the season average for any player, for any stat, for any one of the years of data
provided by the NBA api */
const getSeasonStatAvg = async(stat, year, playerId) => {
    let gameDetailsArray = await getPlayerStandardGameDetails(year, playerId);
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
    carmeloFactor = (.3 * parseFloat(fgp / 10)) + (.7 * hustleFactor);
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
        let id = await getIdFromPlayersByName(playerLastName, playerFirstName);
        let statAverage = await getSeasonStatAvg(stat, season, id);
        let player = await getIndividualPlayer(id);
        appendPlayerAndStat(player.api.players[0], stat, statAverage);
    }
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
}
onStartUp();