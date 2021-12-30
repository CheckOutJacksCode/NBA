
//STAT ABSTRACT FUNCTIONS: /////

/*const getSeasonStatAvg = async(stat, year, playerId) => {
    let gameDetailsArray = await getPlayerStandardGameDetails(year, playerId);
    let statTotal = await getSeasonTotalOfStat(stat, gameDetailsArray);
    let gamesPlayed = await getGamesPlayedInSeason(gameDetailsArray);
    let statAverage = statTotal / gamesPlayed;
    return stat + ': ' + Number.parseFloat(statAverage).toFixed(2);
}

const getSeasonTotalOfStat = async(stat, gameDetailsArray) => {
    let statTotal = 0;
    for (let i = 0; i < gameDetailsArray.length; i++) {
        if (gameDetailsArray[i].min) {
            statTotal += parseInt(gameDetailsArray[i][stat])
        }
    }
    return statTotal;
}
*/
/*-----------------------------------------------------------------------------*/

/*
const getPPG = async(year, playerId) => {
    let gameDetailsArray = await getPlayerStandardGameDetails(year, playerId);
    let totalPoints = await getTotalPointsInSeason(gameDetailsArray);
    let gamesPlayed = await getGamesPlayedInSeason(gameDetailsArray);
    let ppg = totalPoints / gamesPlayed;
    return "ppg: " + Number.parseFloat(ppg).toFixed(2);
}
*/
/*const getTotalDefensiveRebounds = async(gameDetailsArray) => {
    let totalDefensiveRebounds = 0;
    for (let i = 0; i < gameDetailsArray.length; i++) {
        if (gameDetailsArray[i].min) {
            totalDefensiveRebounds += parseInt(gameDetailsArray[i].defReb);
        }
    }
    return totalDefensiveRebounds;
}
*/
/*const getDefRebAverage = async(year, playerId) => {
    let gameDetailsArray = await getPlayerStandardGameDetails(year, playerId);
    let totalDefReb = await getTotalDefensiveRebounds(gameDetailsArray);
    let gamesPlayed = await getGamesPlayedInSeason(gameDetailsArray);
    let defRebAvg = totalDefReb / gamesPlayed;
    return "defensive rebounds: " + Number.parseFloat(defRebAvg).toFixed(2);
}
*/
/*
const getTotalOffensiveRebounds = async(gameDetailsArray) => {
    let totalOffensiveRebounds = 0;
    for (let i = 0; i < gameDetailsArray.length; i++) {
        if (gameDetailsArray[i].min) {
            totalOffensiveRebounds += parseInt(gameDetailsArray[i].offReb);
        }
    }
    return totalOffensiveRebounds;
}
*/
/*const getOffRebAverage = async(year, playerId) => {
    let gameDetailsArray = await getPlayerStandardGameDetails(year, playerId);
    let totalOffReb = await getTotalOffensiveRebounds(gameDetailsArray);
    let gamesPlayed = await getGamesPlayedInSeason(gameDetailsArray);
    let offRebAvg = totalOffReb / gamesPlayed;
    return "offensive rebounds: " + Number.parseFloat(offRebAvg).toFixed(2);
}
/*
/*const getTotalAssists = async(gameDetailsArray) => {
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
    let totalAssists = await getSeasonTotalOfStat("assists", gameDetailsArray);
    let gamesPlayed = await getGamesPlayedInSeason(gameDetailsArray);
    let assistsAvg = totalAssists / gamesPlayed;
    return "assists: " + Number.parseFloat(assistsAvg).toFixed(2);
}
*/
/*const getStatTotalForSeason = async(stat, gameDetailsArray) => {
    let totalOfStat = 0;
    console.log(gameDetailsArray[0]);
    for (let i = 0; i < gameDetailsArray.length; i++) {
        if (gameDetailsArray[i].hasOwnProperty(stat) && gameDetailsArray[i].min) {
            totalOfStat += parseInt(gameDetailsArray[i]);
        }
    }
    return totalOfStat;
}
//console.log(getPPG(2021, 20));*/

/*const getGames = function () {
    let gameNum = 9087;
    let game = await fetch('https://api-nba-v1.p.rapidapi.com/gameDetails/' + gameNum, {
        headers: {
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key': '8f81231b96mshfe26030fc9f1ac5p1954edjsnfaacfd979769'
          }
    })
} */ 