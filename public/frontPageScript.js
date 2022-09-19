const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const statToGet = document.getElementById("statToGet");
const seasonToGet = document.getElementById("season");
const hustleFactorSubmit = document.getElementById("submit-hustle-factor");
const deepStatToGet = document.getElementById("deepStatToGet");
const teamChosen = document.getElementById("teams");
const teamPlayerChosen = document.getElementById("teamplayers");
const seasonAveragesRegularSeasonsTable = document.getElementById("seasonAveragesRegularSeasonsTable");


/* YOU WOULD DO IT JUST LIKE A POST REQUEST, 
DOOO NOOOOTTT USE THE GETJSONRESPONSE FUNCTION
MAKE A SEPARATE FUNCTION CALLED 'const getPlayer....'

and then ...

const getPlayer = async() => {
    console.log('wwwwwwwwwwwww');
    const url = '/players/:id';
    try{
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(obj),
            *****where: ****clause????????????????????????????????????????????????????????????????????????
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

*/
const postPlayer = async(obj) => {
    console.log('wwwwwwwwwwwww');
    const url = '/players';
    console.log(obj);
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
        console.log(error);
    } 
}

const postWriteJsonPlayers = async(obj) => {
    console.log('wwwwwwwwwwwww');
    console.log(obj);
    console.log(obj.length);
    const url = '/playerscloud';
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
        console.log(error);
    } 
}

const postPlayersNBA = async(obj) => {
    console.log('skittttttttlllllllllllleeeeeeeeeeeesssssssssssssssssssssssssssssssssssssssssssssssss');
    console.log(obj);
    
    const url = '/playersNBA';
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(obj)
        })
        if (response.ok) {
            const jsonResponse = response.json();
            return jsonResponse;
        }
    } catch (error) {
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
        console.log(error);
    } 
}

const postGameCloud = async(obj) => {
    console.log('tttttttttt');
    const url = '/gamescloud';
    console.log(obj);
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
        console.log(error);
    } 
}

const postGameInfoCloud = async(obj) => {
    console.log('wwwwwwwwwww');
    const url = '/gameinfocloud';
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
        console.log(error);
    } 
}

const postShot = async(obj) => {
    console.log('wwwwwwooooooooooooooooooooooooooooooooooooooooooowwwww');
    const url = '/shot';
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
        console.log(error);
    } 
}

const postShotBySeason = async(obj, season) => {
    console.log('cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc');
    const url = `/shot/${season}`;
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
        console.log(error);
    } 
}

const postBoxScoresBySeason = async(obj, season) => {
    console.log(season);
    const url = `/boxscores/${season}`;
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
        console.log(error);
    } 
}

const postBoxScoresTraditionalBySeason = async(obj, season) => {
    console.log(season);
    const url = `/boxscorestraditional/${season}`;
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
        console.log(error);
    } 
}

const postLeagueGamesBySeason = async(obj, season) => {
    console.log('cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc');
    const url = `/leaguegames/${season}`;
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
        console.log(error);
    } 
}

const postLeagueHustleStatsBySeason = async(obj, season) => {
    console.log('ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccrap');
    console.log(season);
    const url = `/leaguehustlestats/${season}`;
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
        console.log('error!');
        console.log(error);
    }
}

const postSeasonRegularPlayerStatsTotals = async(obj) => {
    console.log(obj);
    const url = `/seasonregularplayerstats`;
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
        console.log('error!');
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



/* Appends any players' stat to the html table. Can take both regular stats and deep stats. */
rowIndex = 1;
const appendPlayerAndStat = async(player, stat, statAverage) => {

    let row = playerInfoTable.insertRow(rowIndex);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = player[0].firstname + ' ' + player[0].lastname;
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
            'X-RapidAPI-Key': PUBLICAPIKEY,
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
            'X-RapidAPI-Key': PUBLICAPIKEY,
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
            'X-RapidAPI-Key': PUBLICAPIKEY,
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
            'X-RapidAPI-Key': PUBLICAPIKEY,
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
            'X-RapidAPI-Key': PUBLICAPIKEY,
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    })
    if (players.ok) {
        let jsonPlayers = players.json();
        return jsonPlayers;
    }
}
  


/* Retrieves entire desired player object and returns to user. */
const getPlayersByName = async(playerLastName) => {
    let players = await fetch('https://api-nba-v1.p.rapidapi.com/players/lastName/' + playerLastName, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key': PUBLICAPIKEY
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
            'x-rapidapi-key': PUBLICAPIKEY
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
GET GAMES PLAYED BY CHECKING 8IF 'MINS' ARE NOT NULL FOR PLAYER IN EACH GAME LINE
STAT AVERAGE = STEP 2 / STEP 3

GAME LINE ARRAY ===== FOR EVERY GAME IN GAMES DATABASE WHERE PLAYERID = THE PLAYERID, AND LEAGUE = STANDARD
FOR EACH GAME IN ARRAY, ADD UP TOTAL OF STAT SELECTED
FOR EACH GAME IN ARRAY, IF 'MIN' !== NULL, COUNT++, RETURN GAME COUNT
STAT AVERAGE = STAT TOTAL / GAMESPLAYED ARRAY.

*/






/* Retrieves player object 
const getPlayer = async() => {
    let playerFirstName = firstName.value;
    let playerLastName = lastName.value;
    let id = await getIdFromPlayersByName(playerLastName, playerFirstName);
    let player = await getIndividualPlayer(id);
    return player;
}
*/
const getStatsArray = async(playerIdArray) => {
    let statsArray = [];
    for (let i = 0; i < playerIdArray.length; i++) {
        let stats = await getStatsFromPlayerId(playerIdArray[i]);
        statsArray.push(stats);
    }
    return statsArray;
}

let teamArray = [];
const teamsDropDown = async() => {

  let teams = await getJsonResponse('/teamnames');
  var str = ""
    try {
      for (var team of teams) {
        str += "<option>" + team.team_name + "</option>";
        teamArray.push(team.team_name);
      }
      document.getElementById("teams").innerHTML = str;
    } catch(error) {
      console.log(error);
    }
}
/* Start up function, provides functionality for submit buttons. */
let teamPlayersArray = [];
const teamPlayersDropDown = async() => {

    let teamId = await getJsonResponse(`/teamid/${teamChosen.value}`)
    console.log(teamId);
    let teamPlayers = await getJsonResponse(`/teamplayers/${teamId[0].team_id}`);
    console.log(teamPlayers);
    var str = ""
    try {
        for (var player of teamPlayers) {
            console.log(player);
            str += "<option>" + player.player_name + "</option>";
            teamPlayersArray.push(player.player_name);
        }
        document.getElementById("teamplayers").innerHTML = str;
    } catch(error) {
        console.log(error);
    }
    
}

const displayPlayerCareerStats = async() => {
    let player = teamPlayerChosen.value;
    let playerFirstLast = player.split(' ');
    console.log(player);
    console.log(playerFirstLast);
    let playerid = await getJsonResponse(`/official/players/playerid/${playerFirstLast[1]}/${playerFirstLast[0]}`)
    console.log(playerid);
    console.log(playerid[0]);
    if (!playerid[0]) {
        await appendStatsUnavailable();
        return;
    }
    let statLines = await getJsonResponse(`/getregularseasonstatlines/${playerid[0].playerid}`);
    console.log(statLines);
    await appendPlayerRegularSeasonStatLines(statLines);
}

const appendStatsUnavailable = async() => {
    seasonAveragesRegularSeasonsTable.innerHTML = '';
    seasonAveragesRegularSeasonsTable.innerHTML = 'STATISTICS UNAVAILABLE'
}

const appendPlayerRegularSeasonStatLines = async(statlines) => {
    seasonAveragesRegularSeasonsTable.innerHTML = '';
    console.log(statlines);
    let row0 = seasonAveragesRegularSeasonsTable.insertRow(0);
    let headers = Object.keys(statlines[0]);
    console.log(headers);
    for (let i = 2; i < 28; i++) {
        let cell = row0.insertCell(i - 2);
        cell.innerHTML = headers[i];
    }
    let rowIndex = 1;
    for (let j = 0; j < statlines.length; j++) {
        let row = seasonAveragesRegularSeasonsTable.insertRow(rowIndex);
        for (let k = 2; k < 28; k++) {
            let cell = row.insertCell(k - 2);

            let values = Object.values(statlines[j]);
            let totals = [9, 10, 11, 13, 14, 16, 17, 19, 20, 21, 22, 23, 24, 25, 26, 27]
            if (totals.includes(k)) {
                let average = values[k] / values[7];
                cell.innerHTML = average.toFixed(2);
            } else {
                cell.innerHTML = values[k];
            }
        }
    }
    /*
    if (isNaN(statAverage)) {
        cell2.innerHTML = 'Statistics Unavailable'
    } else {
        cell2.innerHTML = `${statAverage}`;
    }*/
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

teamsDropDown();




//UNCOMMENT THIS CODE AND THE DATABASE WILL DELETE ITSELF AND REPLENISH EVERY TIME YOU START THE SERVER
//runOncePerDay(); // run the code

