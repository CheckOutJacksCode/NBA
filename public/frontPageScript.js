const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const statToGet = document.getElementById("statToGet");
const seasonToGet = document.getElementById("season");
const hustleFactorSubmit = document.getElementById("submit-hustle-factor");
const deepStatToGet = document.getElementById("deepStatToGet");





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
        console.log('someone fucked up');
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
        console.log('someone fucked up');
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
        console.log('someone fucked up');
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


/* Start up function, provides functionality for submit buttons. */



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

