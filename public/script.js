const playerId = document.getElementById("playerId");
const playerIdSubmit = document.getElementById("playerId-submit");
const playerInfoTable = document.getElementById("player-info");

playerIdSubmit.onclick = async() => {
    let id = playerId.value;
    let response = await getIndividualPlayer(id);
    appendIndividualPlayer(response.api.players[0]);
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
    let ppg = await getPPG(2021, player.playerId);
    let row = playerInfoTable.insertRow(rowIndex);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = `${player.firstName}`;
    cell2.innerHTML = `${player.lastName}`;
    cell3.innerHTML = `${ppg}`;
    rowIndex += 1;
}

//games/seasonYear/
//2021 where league = 'standard'
//compile a list of game Id's where the season is 2021 and the league is 'standard'
//then use the game id's and loop through statistics/players/playerId

//get list of games in 2021 where the league is 'standard'
const getGamesBySeason = async(year) => {
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
    throw Error('no ball that year');
}

//console.log(getGamesBySeason(2021));

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

//loop through statistics/players/playerId's gameIds, and add up points 
//divide total points by the number of games, ppg.

//for each 

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
    throw Error('garbage player');
}

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
    return ppg;
}

//console.log(getPPG(2021, 20));

/*const getGames = function () {
    let gameNum = 9087;
    let game = await fetch('https://api-nba-v1.p.rapidapi.com/gameDetails/' + gameNum, {
        headers: {
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key': '8f81231b96mshfe26030fc9f1ac5p1954edjsnfaacfd979769'
          }
    })
} */ 




