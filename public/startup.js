const mvpSubmit = document.getElementById("submit-mvp");
const statSubmit = document.getElementById("submit-stat");
const deepStatSubmit = document.getElementById("submit-deep-stat");
const loadUpLocal = document.getElementById("loadButton");
const loadUpGamesLocal = document.getElementById("loadGamesButton");
const loadUpGameInfoLocal = document.getElementById("loadGameInfoButton");
const loadUpShotChartButton = document.getElementById("loadUpShotChartButton");
const loadUpNBAPlayersButton = document.getElementById("loadUpNBAPlayersButton");
const loadUpShotChartsBySeasonButton = document.getElementById("loadUpShotChartsBySeasonButton");


const onStartUp = async() => {
    mvpSubmit.onclick = async() => {
        let playerIdArray = await getIdFromPlayersByNameLocal(lastName.value, firstName.value);
        console.log(seasonToGet.value)
        console.log(playerIdArray[0].playerid)
        let mvpPoints = await getMvpPoints(seasonToGet.value, playerIdArray[0].playerid);
        console.log(mvpPoints)
        let player = await getIndividualPlayerLocal(playerIdArray[0].playerid);
        console.log(player);
        appendPlayerAndStat(player, 'MVP Points: ', mvpPoints);
    }

    statSubmit.onclick = async() => {
        let stat = statToGet.value;
        console.log(stat)
        let playerFirstName = firstName.value;
        let playerLastName = lastName.value;
        let season = seasonToGet.value;
        console.log(season);
        let id = await getIdFromPlayersByNameLocal(playerLastName, playerFirstName);
        console.log(id);
        let statAverage = await getSeasonStatAvgLocal(stat, season, id[0].playerid);
        console.log(statAverage);
        console.log(id);
        let player = await getIndividualPlayerLocal(id[0].playerid);
        console.log(player);
        appendPlayerAndStat(player, stat, statAverage);
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
/*
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
*/

    deepStatSubmit.onclick = async() => {
        let stat = deepStatToGet.value;
        let season = seasonToGet.value;
        let id = await getIdFromPlayersByNameLocal(lastName.value, firstName.value);
        let statPoints;
        if (stat === "Hustle Factor") {
            statPoints = await getHustleFactor(season, id[0].playerid);
        } else if (stat === "Carmelo Factor") {
            statPoints = await getCarmeloFactor(season, id[0].playerid);
        } else {
            statPoints = await getQualityShotPercentage(season, id[0].playerid);
        }
        let player = await getIndividualPlayerLocal(id[0].playerid);
        console.log(player);
        appendPlayerAndStat(player, stat, statPoints);
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
    loadUpShotChartButton.onclick = async() => {
        await loadUpShotCharts();
    }
    loadUpShotChartsBySeasonButton.onclick = async() => {
        await loadUpShotChartsBySeason();
    }
    loadUpNBAPlayersButton.onclick = async() => {
        await loadUpNBAPlayers();
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
            //ACTIVATE CODE IF YOU NEED TO LOAD UP PLAYERS INTO LOCAL DATABASE
            //let player = await postPlayer(players.api.players[i]);
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
            //ACTIVATE CODE IF YOU NEED TO LOAD GAMES DATA INTO LOCAL DATABASE
            //let game = await postGame(statsArray[i].api.statistics[j]);
        }
    }
}

const loadUpGameInfoLocalFunction = async() => {
    let years = ['2015', '2016', '2017', '2018', '2019', '2020', '2021'];
    for (let i = 0; i < years.length; i++) {
        let games = await getGameInfo(years[i]);
        for (let j = 0; j < games.api.games.length; j++) {
            //ACTIVATE CODE IF YOU NEED TO LOAD GAMEINFO INTO YOUR LOCAL DATABASE
            //let results = await postGameInfo(games.api.games[j]);
        }
    } 
}

const loadUpShotCharts = async() => {
    let years = ['2015-2016', '2016-2017', '2017-2018', '2018-2019', '2019-2020', '2020-2021', '2021-2022'];
    for (let i = 0; i < years.length; i++) {
        let shotsArray = await getJsonResponse('/shots');
        for (let k = 0; k < shotsArray.length; k++) {
            for (let j = 0; j < shotsArray[k].resultSets.length; j++) {
                for (let m = 0; m < shotsArray[k].resultSets[j].rowSet.length; m++) {
                    console.log(shotsArray[k].resultSets[j].rowSet.length);
                    
                    //ACTIVATE CODE IF YOU NEED TO LOAD SHOTS INTO YOUR DATABASE
                    let results = await postShot(shotsArray[k].resultSets[j].rowSet[m]);
                }
            }
        }
    } 
}

const loadUpShotChartsBySeason = async() => {
    let years = ['2015-2016', '2016-2017', '2017-2018', '2018-2019', '2019-2020', '2020-2021', '2021-2022'];
    for (let i = 0; i < years.length; i++) {
        let shotsArray = await getJsonResponse(`/shots/${years[i]}`);
        for (let j = 0; j < shotsArray.resultSets.length; j++) {
            for (let m = 0; m < shotsArray.resultSets[j].rowSet.length; m++) {
                console.log(shotsArray.resultSets[j].rowSet.length);
                
                //ACTIVATE CODE IF YOU NEED TO LOAD SHOTS INTO YOUR DATABASE
                let results = await postShotBySeason(shotsArray.resultSets[j].rowSet[m], years[i]);
            }
        }
    }
    console.log('FINISHED!!!!!!!!!!!!!!!!!!!!!!1');
}

const loadUpNBAPlayers = async() => {
    let players = await getJsonResponse('/playersNBA');
    console.log(players.length);   
    let results = await postPlayersNBA(players);
}

onStartUp();
