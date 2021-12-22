const playerId = document.getElementById("playerId");
const playerIdSubmit = document.getElementById("playerId-submit");
const playerInfoTable = document.getElementById("player-info");

playerIdSubmit.onclick = async() => {
    let id = playerId.value;
    console.log(id);
    let response = await getIndividualPlayer(id);
    console.log(response.api.players[0]);
    appendIndividualPlayer(response.api.players[0]);
}

const getIndividualPlayer = async(id) => {
    let jsonResponse;
    console.log(id);
    const response = await fetch('https://api-nba-v1.p.rapidapi.com/players/playerId/' + id, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
          'x-rapidapi-key': '8f81231b96mshfe26030fc9f1ac5p1954edjsnfaacfd979769'
        }
    });
    if (response.ok) {
        jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse;
    }
}

let rowIndex = 1;
const appendIndividualPlayer = function(player) {
    let row = playerInfoTable.insertRow(rowIndex);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    cell1.innerHTML = `${player.firstName}`;
    cell2.innerHTML = `${player.lastName}`;
    cell3.innerHTML = `${player.ppg}`;
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
        console.log(jsonResponse);
        return jsonResponse;
    }
    throw Error('no ball that year');
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

console.log(getStandardGames(2021));
/*const getGames = function () {
    let gameNum = 9087;
    let game = await fetch('https://api-nba-v1.p.rapidapi.com/gameDetails/' + gameNum, {
        headers: {
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key': '8f81231b96mshfe26030fc9f1ac5p1954edjsnfaacfd979769'
          }
    })
} */ 




