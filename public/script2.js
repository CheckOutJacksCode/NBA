const statSubmit = document.getElementById("submit-stat");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const statToGet = document.getElementById("statToGet");
const seasonToGet = document.getElementById("season");
//const getIndividualPlayer = require("./script.js");


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

rowIndex = 1;
const appendPlayerAndStat = async(player, statAverage) => {
    let row = playerInfoTable.insertRow(rowIndex);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = `${player.firstName}`;
    cell2.innerHTML = `${player.lastName}`;
    cell3.innerHTML = `${statAverage}`;
    rowIndex += 1;
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
    return stat + ': ' + Number.parseFloat(statAverage).toFixed(2);
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

statSubmit.onclick = async() => {
    let stat = statToGet.value;
    let playerFirstName = firstName.value;
    let playerLastName = lastName.value;
    let season = seasonToGet.value;
    let id = await getIdFromPlayersByName(playerLastName, playerFirstName);
    let statAverage = await getSeasonStatAvg(stat, season, id);
    let player = await getIndividualPlayer(id);
    appendPlayerAndStat(player.api.players[0], statAverage);
}
/*NOW YOU HAVE THE PLAYER ID.
CALL GETSTANDARDPLAYERDETAILS*/