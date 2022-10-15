const homeRosterTable = document.getElementById("seasonHomeTeamRosterTable");
const visitorRosterTable = document.getElementById("seasonHomeTeamRosterTable");
const boxTraditionalSeasonAverageTableHome = document.getElementById("boxTraditionalSeasonAverageTableHome");
const boxTraditionalSeasonAverageTable_82Home = document.getElementById("boxTraditionalSeasonAverageTable_82Home");
const boxTraditionalSeasonAverageTableVisitor = document.getElementById("boxTraditionalSeasonAverageTableVisitor");
const boxTraditionalSeasonAverageTable_82Visitor = document.getElementById("boxTraditionalSeasonAverageTable_82Visitor");

const homeTeamSeasonGameResultsTable = document.getElementById("gameResultsHomeTeamPerSeasonTable");
const visitorTeamSeasonGameResultsTable = document.getElementById("gameResultsVisitorTeamPerSeasonTable");
const teamsP240ExpectedTable = document.getElementById("teamsp240expectedtable");
const getBoxTraditionalButtonHome = document.getElementById("getBoxTraditionalButtonHome");
const getBoxTraditionalButtonVisitor = document.getElementById("getBoxTraditionalButtonVisitor");
const getP240ExpectedButton = document.getElementById("getP240ExpectedButton");
const p240StatSelected = document.getElementById("p240StatDropDown");
const boxTraditionalSeasonAverageTable = document.getElementById("boxTraditionalSeasonAverageTable");
const boxTraditionalSeasonAverageTable_82 = document.getElementById("boxTraditionalSeasonAverageTable_82");
const getHomeTeamGameResultsButton = document.getElementById("getHomeTeamGameResults");
const getVisitorTeamGameResultsButton = document.getElementById("getVisitorTeamGameResults");
const p240ExpectedTableHome = document.getElementById("p240ExpectedTableHome");
const p240ExpectedTableVisitor = document.getElementById("p240ExpectedTableVisitor");
const seasonDropChoice = document.getElementById("seasonGameResults");

const homeTeam = document.getElementById("homeTeamJackarithm");
const visitorTeam = document.getElementById("visitorTeamJackarithm");
const compareP240ExpectedResultsToGameResultsButton = document.getElementById("compareP240ExpectedResultsToGameResultsButton");
const compareResultsTable = document.getElementById("compareResultsTable");
const writeOddsToDatabaseButton = document.getElementById("writeOddsToDatabaseButton");
const compareP240ResultsBySeasonButton = document.getElementById("compareP240ResultsBySeasonButton");

const compareStatExpectedResultsToGameResultsButton = document.getElementById("compareExpectedResultsToGameResultsButton");
const compareStatResultsBySeasonButton = document.getElementById("compareResultsBySeasonButton");
const compareP240ResultsBySeasonTotalsButton = document.getElementById("compareP240ResultsBySeasonTotalsButton");



const getJsonResponseJackarithm = async (url) => {
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
/*
const getRoster = async(season, team) => {
    let roster = await getJsonResponseJackarithm(`/getroster/${season}/${team}`);
    let totalMinutes = 0;
    let totalMinutes_82 = 0;
    for (let i = 0; i < roster.length; i++) {
        let appendedPlayer = await appendPlayerRosterTable(roster[i].player_id, roster[i].player_name);
        let playerStats = await getPlayerSeasonOffensiveStatAveragesTraditional(season, roster[i].player_id);
        console.log(playerStats);
        console.log(playerStats[0])
        console.log(playerStats[1])
        totalMinutes += playerStats[0].min;
        //total of minutes per 82 games of every player on roster
        totalMinutes_82 += playerStats[1].min;
        await appendPlayerBoxTraditionalSeasonAverageTable(playerStats, roster[i].player_name);
    }
    console.log(totalMinutes);
    console.log(totalMinutes_82);
}
*/

const getRosterFromPreviousGame = async(teamId, gameDate) => {
    //THIS IS HOW YOU GET THE MOST RECENT GAME_ID FROM BOXSCORESTRADITIONAL WHEN THE SEASON STARTS
/*
    let team = document.getElementById(`${H_or_V}TeamJackarithm`);
    let teamId = await getJsonResponse(`/teamid/${team.value}`);
    let season = '2018-2019';
    let teamId = '1610612744'
    let todaysDate = new Date();
    console.log(todaysDate);
    let recentGameId = await getJsonResponseJackarithm(`/previousgame/gameid/${season}/${teamId}`);
    console.log(recentGameId);
    recentGameId = recentGameId[0].game_id;
    let roster = await getJsonResponseJackarithm(`/previousgame/gameid/${season}/${teamId}/${recentGameId}`);
    console.log(roster);
*/  let gameDateArray = [];
    let splitGameDate = gameDate.split('-');
    let day = splitGameDate[2];
    let thirtyOneDayMonths = ['01', '03', '05', '07', '08', '10', '12'];
    let thirtyDayMonths = ['09', '04', '06', '11'];
    let february = '02';
    let zeroMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09'];
    let month;
    let newMonth;
    for (let i = 1; i < 6; i++) {
       
        if (zeroMonths.includes(day.toString())) {
            day = day.substring(1);
        }
        let previousDay = parseInt(day) - i;

        if (previousDay < 1) {
            if (zeroMonths.includes(splitGameDate[1])) {
                month = splitGameDate[1].substring(1);
                let intMonth = parseInt(month);
                let previous = intMonth - 1;
                if (previous === 0) {
                    previous = 12;
                }
                if (previous < 10) {
                    newMonth = `0${previous}`;
                }
            }
        } else {
            newMonth = splitGameDate[1];
        }

        if (previousDay === 0) {
            if (thirtyOneDayMonths.includes(newMonth)) {
                previousDay = 31;
            }
            else if (thirtyDayMonths.includes(newMonth)) {
                previousDay = 30;
            } else {
                previousDay = 28;
            }
        }
        else if (previousDay === -1) {
            if (thirtyOneDayMonths.includes(newMonth)) {
                previousDay = 30;
            }
            else if (thirtyDayMonths.includes(newMonth)) {
                previousDay = 29;
            } else {
                previousDay = 27;
            }
        }
        else if (previousDay === -2) {
            if (thirtyOneDayMonths.includes(newMonth)) {
                previousDay = 29;
            }
            else if (thirtyDayMonths.includes(newMonth)) {
                previousDay = 28;
            } else {
                previousDay = 26;
            }
        }
        else if (previousDay === -3) {
            if (thirtyOneDayMonths.includes(newMonth)) {
                previousDay = 28;
            }
            else if (thirtyDayMonths.includes(newMonth)) {
                previousDay = 27;
            } else {
                previousDay = 25;
            }
        }
        else if (previousDay === -4) {
            if (thirtyOneDayMonths.includes(newMonth)) {
                previousDay = 27;
            }
            else if (thirtyDayMonths.includes(newMonth)) {
                previousDay = 26;
            } else {
                previousDay = 24;
            }
        }
    
        let lastGameDate;
        if (previousDay < 10) {
            lastGameDate = splitGameDate[0] + '-' + newMonth + '-0' + previousDay.toString();
        } else {
            lastGameDate = splitGameDate[0] + '-' + newMonth + '-' + previousDay.toString();
        }
        gameDateArray.push(lastGameDate);
    }
    let roster;
    for (let j = 0; j < gameDateArray.length; j++) {
        let recentGameId = await getJsonResponseJackarithm(`/testing/previousgame/gameid/${seasonDropChoice.value}/${teamId[0].team_id}/${gameDateArray[j]}`);
        if (recentGameId.length > 0) {
            recentGameId = recentGameId[0].game_id;
            roster = await getJsonResponseJackarithm(`/previousgame/gameid/${seasonDropChoice.value}/${teamId[0].team_id}/${recentGameId}`);
            return roster;
        }
    }
    roster = await getJsonResponseJackarithm(`/getroster/${seasonDropChoice.value}/${teamId[0].team_id}`)
    return roster;

    
}

const getRosterNoParams = async(H_or_V) => {
    let team = document.getElementById(`${H_or_V}TeamJackarithm`);
    let teamId = await getJsonResponse(`/teamid/${team.value}`)
    let season = '2017-2018';
    let roster = await getJsonResponseJackarithm(`/getroster/${season}/${teamId[0].team_id}`);
    for (let i = 0; i < roster.length; i++) {
        let appendedPlayer = await appendPlayerRosterTable(roster[i].player_id, roster[i].player_name, H_or_V);
    }
}

getBoxTraditionalButtonHome.onclick = async() => {
    let HorV = 'home';

    let team = document.getElementById(`${HorV}TeamJackarithm`);
    let teamId = await getJsonResponse(`/teamid/${team.value}`)
    let season = '2017-2018';
    let roster = await getJsonResponseJackarithm(`/getroster/${season}/${teamId[0].team_id}`);

    let table = "boxscorestraditional2021-2022"

    let stats = await getJsonResponseJackarithm(`/statsheaders/${table}`)

    await appendBoxTraditionalHeaders(HorV, stats);

    for (let i = 0; i < roster.length; i++) {
        let playerStats = await getPlayerHorVOffensiveStatAveragesTraditional(season, roster[i].player_id, HorV);
        await appendPlayerBoxTraditionalSeasonAverageTable(playerStats, roster[i].player_name, HorV);
    }
}

getBoxTraditionalButtonVisitor.onclick = async() => {
    let HorV = 'visitor';

    let team = document.getElementById(`${HorV}TeamJackarithm`);
    let teamId = await getJsonResponse(`/teamid/${team.value}`)
    let season = '2017-2018';
    let roster = await getJsonResponseJackarithm(`/getroster/${season}/${teamId[0].team_id}`);

    let table = "boxscorestraditional2021-2022"

    let stats = await getJsonResponseJackarithm(`/statsheaders/${table}`)

    await appendBoxTraditionalHeaders(HorV, stats);

    for (let i = 0; i < roster.length; i++) {
        let playerStats = await getPlayerHorVOffensiveStatAveragesTraditional(season, roster[i].player_id, HorV);
        await appendPlayerBoxTraditionalSeasonAverageTable(playerStats, roster[i].player_name, HorV);
    }
}


//for one player, return every stat average per season
const getPlayerSeasonOffensiveStatAveragesTraditional = async(season, playerid, H_or_V) => {
    let table = 'boxscorestraditional2021-2022';
    let stats = await getJsonResponseJackarithm(`/statsheaders/${table}`);
    let playerStats = await getStatsFromBoxTraditional(season, playerid);
    
    let averagesObjectAny = {};
    let averagesObject_82Any = {};
    let averagesObjectAny_HorV = {};
    let averagesObject_82Any_HorV = {};
 
    let gameCount = 0;
    let gameCount_HorV = 0;
    let gameCount_total_HorV = 0;
    let stats_82 = [];
    let statsPerGame = [];
    let statsHeaders = [];
    let stats_82_HorV = [];
    let statsPerGame_HorV = [];
    let statsHeaders_HorV = [];

    for (let j = 0; j <stats.length; j++) {

        statsHeaders.push(stats[j].column_name)
        stats_82.push(0);
        statsPerGame.push(0);
        stats_82_HorV.push(0);
        statsPerGame_HorV.push(0);
        statsHeaders_HorV.push(0);

    }    
    
    let team_id = playerStats[0].team_id;
    let horv_gameids;

    for (let i = 0; i < playerStats.length; i++) {
        if (H_or_V === 'home') {
            horv_gameids = await getJsonResponseJackarithm(`/home/gameids/${season}/${team_id}`);
        } else {
            horv_gameids = await getJsonResponseJackarithm(`/visitor/gameids/${season}/${team_id}`)
        }

        let result = horv_gameids.map(a => a.game_id);
        if (result.includes(playerStats[i].game_id)) {

            gameCount_total_HorV++;
            if (parseFloat(playerStats[i].min) > 0) {
                gameCount_HorV++;
            }

            if (!playerStats[i].min) {
                playerStats[i].min = 0;
            }

            for (let j = 0; j < stats.length; j++) {
                if (stats[j].column_name === 'points') {
                    stats[j].column_name = 'pts';
                }

                if (!parseFloat(playerStats[i][stats[j].column_name])) {
                    playerStats[i][stats[j].column_name] = 0;
                }
                stats_82_HorV[j] += parseFloat(playerStats[i][stats[j].column_name]);

                if (parseFloat(playerStats[i].min) > 0) {
                    statsPerGame_HorV[j] += parseFloat(playerStats[i][stats[j].column_name]);
                }
            }
        }
        if (parseFloat(playerStats[i].min) > 0) {
            gameCount++;
        }
    
        if (!playerStats[i].min) {
            playerStats[i].min = 0;
        }
    
        for (let j = 0; j < stats.length; j++) {
            if (stats[j].column_name === 'points') {
                stats[j].column_name = 'pts';
            }
        
            if (!parseFloat(playerStats[i][stats[j].column_name])) {
                playerStats[i][stats[j].column_name] = 0;
            }
            stats_82[j] += parseFloat(playerStats[i][stats[j].column_name]);
        
            if (parseFloat(playerStats[i].min) > 0) {
                statsPerGame[j] += parseFloat(playerStats[i][stats[j].column_name]);
            }
        }
        //total of minutes per 82 games of every player on roster
    }

    let gamesInSeasonCount = await getJsonResponseJackarithm(`/lengthofseason/${season}`);

    for (let k = 0; k < stats_82.length; k++) {
        let header = statsHeaders[k];
        let statAverage_82 = stats_82[k] / gamesInSeasonCount;
        let statAverage = statsPerGame[k] / gameCount;
        let statAverage_82_HorV = stats_82_HorV[k] / gameCount_total_HorV;
        let statAverage_HorV = statsPerGame_HorV[k] / gameCount_HorV;

        averagesObjectAny[header] = statAverage;
        averagesObject_82Any[header] = statAverage_82;
        averagesObjectAny_HorV[header] = statAverage_HorV;
        averagesObject_82Any_HorV[header] = statAverage_82_HorV;
    }
    return [averagesObjectAny, averagesObject_82Any, averagesObjectAny_HorV, averagesObject_82Any_HorV];
}

const getStatsFromBoxTraditional = async(season, playerid) => {
    let stats = await getJsonResponseJackarithm(`/jackarithm/boxscorestraditional/${playerid}/${season}`);
    return stats;
}

rosterHomeRowIndex = 0;
rosterVisitorRowIndex = 0;
const appendPlayerRosterTable = async(playerid, player, H_or_V) => {
    let row;
    if (H_or_V === 'home') {
        row = seasonHomeTeamRosterTable.insertRow(rosterHomeRowIndex);
        rosterHomeRowIndex += 1;
    } else {
        row = seasonVisitorTeamRosterTable.insertRow(rosterVisitorRowIndex);
        rosterVisitorRowIndex += 1;
    }
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = player;
    cell2.innerHTML = playerid;
    return 'appended';
}


const appendBoxTraditionalHeaders = async(H_or_V, stats) => {
    let headerRow
    let headerRow_82 
    if (H_or_V === 'home') {
        headerRow = boxTraditionalSeasonAverageTableHome.insertRow();
        headerRow_82 = boxTraditionalSeasonAverageTable_82Home.insertRow();
    } else if (H_or_V === 'visitor') {
        headerRow = boxTraditionalSeasonAverageTableVisitor.insertRow();
        headerRow_82 = boxTraditionalSeasonAverageTable_82Visitor.insertRow();
    }
    let headerRowSeason = boxTraditionalSeasonAverageTable.insertRow();
    let headerRow_82Season = boxTraditionalSeasonAverageTable_82.insertRow();
    let cellNull = headerRow.insertCell()
    let cellNull_82 = headerRow_82.insertCell();
    let cellNullSeason = headerRowSeason.insertCell()
    let cellNullSeason_82 = headerRow_82Season.insertCell();
    cellNull.innerHTML = 'NBA'
    cellNull_82 = 'NBA'
    cellNullSeason = 'NBA'
    cellNullSeason_82 = 'NBA'

    for (let i = 0; i < stats.length; i++) {
       
        let cellHeader = headerRow.insertCell()
        let cellHeader_82 = headerRow_82.insertCell();
        cellHeader.innerHTML = stats[i].column_name
        cellHeader_82.innerHTML = stats[i].column_name
        let cellHeaderSeason = headerRowSeason.insertCell();
        cellHeaderSeason.innerHTML = stats[i].column_name
        let cellHeaderSeason_82 = headerRow_82Season.insertCell()
        cellHeaderSeason_82.innerHTML = stats[i].column_name
    }
}

const appendPlayerBoxTraditionalSeasonAverageTable = async(objArray, player_name, H_or_V) => {
    let statRow 
    let statRow_82
    
    if (H_or_V === 'home') {
        statRow = boxTraditionalSeasonAverageTableHome.insertRow();
        statRow_82 = boxTraditionalSeasonAverageTable_82Home.insertRow();
    } else if (H_or_V === 'visitor') {
        statRow = boxTraditionalSeasonAverageTableVisitor.insertRow();
        statRow_82 = boxTraditionalSeasonAverageTable_82Visitor.insertRow();
    }

    //let nameRowSeason = boxTraditionalSeasonAverageTable.insertRow(0);
    
    //let statRowSeason = boxTraditionalSeasonAverageTable.insertRow();
   
    //let nameRow_82Season = boxTraditionalSeasonAverageTable_82.insertRow(0);
    //let statRow_82Season = boxTraditionalSeasonAverageTable_82.insertRow();

    let cellStatPlayerName = statRow.insertCell()
    let cellStatPlayerName_82 = statRow_82.insertCell()

    //let cellStatPlayerNameSeason = statRowSeason.insertCell()
    //let cellStatSeasonPlayerName_82 = statRow_82Season.insertCell()

    cellStatPlayerName.innerHTML = player_name
    cellStatPlayerName_82.innerHTML = player_name
    //cellStatPlayerNameSeason.innerHTML = player_name
    //cellStatSeasonPlayerName_82.innerHTML = player_name

    for (let i = 0; i < Object.keys(objArray[0]).length; i++) {
        let cellStat = statRow.insertCell()

        let cellStat_82 = statRow_82.insertCell()

        cellStat.innerHTML = Object.values(objArray[0])[i]
        
        cellStat_82.innerHTML = Object.values(objArray[1])[i]

        /*let cellStatSeason = statRowSeason.insertCell()
        let cellStatSeason_82 = statRow_82Season.insertCell()
        cellStatSeason.innerHTML = Object.values(objArray[2])[i]
        
        cellStatSeason_82.innerHTML = Object.values(objArray[3])[i]
        */
    }
    return 'appended';
}

let teamArray = [];
const teamsDropDown = async() => {

    let teams = await getJsonResponseJackarithm('/teamnames');
    var str = '<option value="none" selected disabled hidden>Select an Option</option>';
    homeTeam.innerHTML = str;
    visitorTeam.innerHTML = str;

    try {
      for (var team of teams) {
        str += "<option>" + team.team_name + "</option>";
        teamArray.push(team.team_name);
      }
      homeTeam.innerHTML = str;
      visitorTeam.innerHTML = str;

    } catch(error) {
      console.log(error);
    }
}

getHomeTeamGameResultsButton.onclick = async() => {
    await getSeasonGameResultsByTeamHome();
}

getVisitorTeamGameResultsButton.onclick = async() => {
    await getSeasonGameResultsByTeamVisitor();
}

const getSeasonGameResultsByTeamHome = async() => {
    
    let season = seasonGameResults.value;
    //get league games

    let results = await getJsonResponseJackarithm(`/jackarithm/gameResults/home/${homeTeam.value}/${season}`)

    let headers = homeTeamSeasonGameResultsTable.insertRow();
    for (let j = 0; j < Object.keys(results[0]).length; j++) {
        let cell = headers.insertCell(j);
        cell.innerHTML = Object.keys(results[0])[j];
    }
    for (let i = 0; i < results.length; i++) {
        let appendedGame = await appendSeasonGameResultsHome(results[i]);
    }
}

const appendSeasonGameResultsHome = async(game) => {
    
    let row = homeTeamSeasonGameResultsTable.insertRow();
    for (let i = 0; i < Object.keys(game).length; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = Object.values(game)[i];
    }
    return (game);

}

const getSeasonGameResultsByTeamVisitor = async() => {
    
    let season = seasonGameResults.value;
    //get league games

    let results = await getJsonResponseJackarithm(`/jackarithm/gameResults/visitor/${visitorTeam.value}/${season}`)

    let headers = visitorTeamSeasonGameResultsTable.insertRow();
    for (let j = 0; j < Object.keys(results[0]).length; j++) {
        let cell = headers.insertCell(j);
        cell.innerHTML = Object.keys(results[0])[j];
    }
    for (let i = 0; i < results.length; i++) {
        let appendedGame = await appendSeasonGameResultsVisitor(results[i]);
    }
}

const appendSeasonGameResultsVisitor = async(game) => {
    
    let row = visitorTeamSeasonGameResultsTable.insertRow();
    for (let i = 0; i < Object.keys(game).length; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = Object.values(game)[i];
    }
    return (game);

}

getP240ExpectedButton.onclick = async() => {
    teamsP240ExpectedTable.innerHTML = '';
    let stat = p240StatSelected.value;
    let results = getStatP240Expected(stat);
}

getP240ExpectedHomeButton.onclick = async() => {
    p240ExpectedTableHome.innerHTML = '';
    let stat = p240StatSelected.value;
    let results = getStatP240Expected_HorV(stat, 'home');
}

getP240ExpectedVisitorButton.onclick = async() => {
    p240ExpectedTableVisitor.innerHTML = '';
    let stat = p240StatSelected.value;
    let results = getStatP240Expected_HorV(stat, 'visitor');
}

const appendExpectedStat = async(team, pp240expected) => {
    let row = teamsP240ExpectedTable.insertRow();
    let cell = row.insertCell(0)
    cell.innerHTML = team;
    let cell2 = row.insertCell(1)
    cell2.innerHTML = pp240expected;
   
}


const getStatP240Expected = async(stat) => {
    let teams = await getJsonResponseJackarithm('/teamnames');
    let season = '2017-2018';
    let previousSeason = '2016-2017';
    for (let x = 0; x < teams.length; x++) {
        let teamId = await getJsonResponseJackarithm(`/teamid/${teams[x].team_name}`)
        let totalMinutes = 0;
        let totalMinutes_82 = 0;
        let totalStat = 0;
        let totalStat_82 = 0;
        let roster = await getJsonResponseJackarithm(`/getroster/${season}/${teamId[0].team_id}`);
        for (let i = 0; i < roster.length; i++) {
            let playerStats = await getPlayerSeasonOffensiveStatAveragesTraditional(previousSeason, roster[i].player_id);
            totalMinutes += playerStats[0].min;
            //total of minutes per 82 games of every player on roster
            totalMinutes_82 += playerStats[1].min;
            totalStat += playerStats[0][stat];
            totalStat_82 += playerStats[1][stat];
        }
        let ratio_82 = totalStat_82 / totalMinutes_82;

        let statPer240Expected = ratio_82 * 240;
      
        let results = await appendExpectedStat(teams[x].team_name, statPer240Expected);
    }
}

const getStatP240Expected_HorV = async(stat, H_or_V) => {
    let team;
    if (H_or_V === 'home') {
        team = homeTeam.value;
    } else {
        team = visitorTeam.value;
    }

    let season = '2017-2018';
    let previousSeason = '2016-2017';
    let teamId = await getJsonResponseJackarithm(`/teamid/${team}`)
    let totalMinutes = 0;
    let totalMinutes_82 = 0;
    let totalStat = 0;
    let totalStat_82 = 0;
    let roster = await getJsonResponseJackarithm(`/getroster/${season}/${teamId[0].team_id}`);

    for (let i = 0; i < roster.length; i++) {
        let playerStats = await getPlayerHorVOffensiveStatAveragesTraditional(previousSeason, roster[i].player_id, H_or_V);
        totalMinutes += playerStats[0].min;
        //total of minutes per 82 games of every player on roster
        totalMinutes_82 += playerStats[1].min;
        totalStat += playerStats[0][stat];
        totalStat_82 += playerStats[1][stat];
    }
    let ratio_82 = totalStat_82 / totalMinutes_82;
    let statPer240Expected = ratio_82 * 240;
    
    if (H_or_V === 'home') {
        await appendExpectedStatHome(team, statPer240Expected);
    } else {
        await appendExpectedStatVisitor(team, statPer240Expected);    
    }
}

const appendExpectedStatHome = async(team, pp240expected) => {
    let row = p240ExpectedTableHome.insertRow();
    let cell = row.insertCell()
    cell.innerHTML = team;
    let cell2 = row.insertCell()
    cell2.innerHTML = pp240expected;
  
}

const appendExpectedStatVisitor = async(team, pp240expected) => {
    let row = p240ExpectedTableVisitor.insertRow();
    let cell = row.insertCell(0)
    cell.innerHTML = team;
    let cell2 = row.insertCell(1)
    cell2.innerHTML = pp240expected;

}

//for each p240 stat,
    //for all matchups between home and visitor teams
        //compare expected result to actual result
        //FOUR CELLS PER ROW:
        //append actual
        //append expected
        //append GREEN for a successful prediction
        //append RED for an unsuccessful prediction

const getStatExpectedNoAppend = async(stat, H_or_V, gameDate, visitorteam) => {
    let team;

    if (visitorteam) {
        if (H_or_V === 'home') {
            team = homeTeam.value;
        } else {
            team = visitorteam;
        }
    } else {
        if (H_or_V === 'home') {
            team = homeTeam.value;
        } else {
            team = visitorTeam.value;
        }
    }

    let season = '2017-2018';
    let teamId = await getJsonResponseJackarithm(`/teamid/${team}`)
    let totalMinutes = 0;
    let totalMinutes_82 = 0;
    let totalStat = 0.0;
    let totalStat_82 = 0;
    //let roster = await getJsonResponseJackarithm(`/getroster/${seasonDropChoice.value}/${teamId[0].team_id}`);
    let roster = await getRosterFromPreviousGame(teamId, gameDate);

    for (let i = 0; i < roster.length; i++) {
        let playerStats = await getPlayerHorVOffensiveStatAveragesTraditional(season, roster[i].player_id, H_or_V);
     
        //totalMinutes += playerStats[0].min;
        //total of minutes per 82 games of every player on roster
        //totalMinutes_82 += playerStats[1].min;
        if (playerStats[0][stat]) {
            totalStat += playerStats[0][stat];
            totalStat_82 += playerStats[1][stat];
        }
    }
    let statPerGameExpected = totalStat;
    let statObject = {};
    statObject[stat] = statPerGameExpected;
    return [statObject, season]
}

const getStatP240ExpectedNoAppend = async(stat, H_or_V, gameDate, hometeam, visitorteam) => {
    let team;
    
    if (homeTeam.value == "none") {
        if (H_or_V === 'home') {
            team = hometeam;
        } else {
            team = visitorteam;
        }
    } else {
        if (visitorteam) {
            if (H_or_V === 'home') {
                team = homeTeam.value;
            } else {
                team = visitorteam;
            }
        } else {
            if (H_or_V === 'home') {
                team = homeTeam.value;
            } else {
                team = visitorTeam.value;
            }
        }
    }
    let season = '2021-2022';
    let teamId = await getJsonResponseJackarithm(`/teamid/${team}`)
    let totalMinutes = 0;
    let totalMinutes_82 = 0;
    let totalStat1 = 0;
    let totalStat_82_1 = 0;
    let totalStat2 = 0;
    let totalStat_82_2 = 0;
    //let roster = await getJsonResponseJackarithm(`/getroster/${seasonDropChoice.value}/${teamId[0].team_id}`);
    let roster = await getRosterFromPreviousGame(teamId, gameDate);
    let recentGameId = await getJsonResponseJackarithm(`/testing/previousgame/gameid/${seasonDropChoice.value}/${teamId[0].team_id}/${gameDate}`);
    recentGameId = recentGameId[0].game_id.substring(2)
    let gameid = parseInt(recentGameId);
    console.log(gameDate)
    console.log(gameid)
    console.log(teamId[0].team_id)
    let boxNum = await getJsonResponseJackarithm(`/boxnum/${gameid}/${season}/${teamId[0].team_id}`);
    console.log(boxNum[0].count)

    let backupStat = 'plus_minus'
    for (let i = 0; i < roster.length; i++) {
        let playerStats = await getPlayerHorVOffensiveStatAveragesTraditional(season, roster[i].player_id, H_or_V, teamId, boxNum[0].count);
        totalMinutes += playerStats[0].min;
        //total of minutes per 82 games of every player on roster

        //HHHHHHHHHHEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRRRRRRRRRRRREEEEEEEEEEEEEEEEEEEEEEEEEEE
        totalMinutes_82 += playerStats[1].min;

        totalStat2 += playerStats[0][backupStat];
        totalStat_82_2 += playerStats[1][backupStat];
        if (!playerStats[2][stat]) {
            playerStats[2][stat] = playerStats[0][backupStat];
            playerStats[3][stat] = playerStats[1][backupStat];
            //playerStats[2][stat] = '0.2500';
            //playerStats[3][stat] = '0.2500';
            console.log('BACKUP STAT======================BACKUP STAT')
        }
        totalStat1 += playerStats[2][stat];
        totalStat_82_1 += playerStats[3][stat];
    }

    let ratio_82_1 = totalStat_82_1 / totalMinutes_82;
    let statPer240Expected1 = ratio_82_1 * 240;
    let statObject1 = {};
    statObject1[stat] = statPer240Expected1;

    let ratio_82_2 = totalStat_82_2 / totalMinutes_82;
    let statPer240Expected2 = ratio_82_2 * 240;
    let statObject2 = {};
    statObject2[backupStat] = statPer240Expected2;
    return [statObject1, statObject2, season]
}

compareP240ResultsBySeasonTotalsButton.onclick = async() => {
    let stat = 'plus_minus';
    let teamsH = await getJsonResponseJackarithm('/teamnames');
    
    for (let i = 0; i < teamsH.length; i++) {
        let hometeam = teamsH[i];
        hometeam = hometeam.team_name;
        let teamsV = await getJsonResponseJackarithm('/teamnames');
        for (let j = 0; j < teamsV.length; j++) {
            if (teamsV[j].team_name === hometeam) {
                let index = teamsV.indexOf(teamsV[j]);
                teamsV.splice(index, 1);
            }
        }
        let stuff;
        for (let k = 0; k < teamsV.length; k++) {
            
            stuff = await compareP240ExpectedResultsToGameResults(stat, hometeam, teamsV[k].team_name);
            if (stuff == null) {
                continue;
            }
            let results = await oddStuff(stuff, stat, hometeam, teamsV[k].team_name);
        }
    }
}

compareStatResultsBySeasonButton.onclick = async() => {
    let stat = 'plus_minus';
    let hometeam = homeTeam.value;
    let teams = await getJsonResponseJackarithm('/teamnames');
    for (let j = 0; j < teams.length; j++) {
        if (teams[j].team_name === hometeam) {
            let index = teams.indexOf(teams[j]);
            teams.splice(index, 1);
        }
    }

    let stuff;
    for (let i = 0; i < teams.length; i++) {
        stuff = await compareStatExpectedResultsToGameResults(stat, hometeam, teams[i].team_name);
        let results = await oddStuff(stuff, stat, teams[i].team_name);
    }
}

compareP240ResultsBySeasonButton.onclick = async() => {
    let stat = 'plus_minus';
    let hometeam = homeTeam.value;
    let teams = await getJsonResponseJackarithm('/teamnames');
    for (let j = 0; j < teams.length; j++) {
        if (teams[j].team_name === hometeam) {
            let index = teams.indexOf(teams[j]);
            teams.splice(index, 1);
        }
    }

    let stuff;
    for (let i = 0; i < teams.length; i++) {
        stuff = await compareP240ExpectedResultsToGameResults(stat, hometeam, teams[i].team_name);
        let results = await oddStuff(stuff, stat, hometeam, teams[i].team_name);
    }
}

compareP240ExpectedResultsToGameResultsButton.onclick = async() => {
    let stat = 'plus_minus'
    let stuff = await compareP240ExpectedResultsToGameResults(stat);
    // get expected points for each team
    // get moneyline for each team
    // if home team wins
        // if expected pts home team > expected pts visitor team 
            // use money line to calculate winnings on a $100 bet
                // add winnings to total
        // else if expected pts home team < expected pts visitor team
            // use money line to calculate losses on a $100 bet
                // subtract losses from total
    // else if home team loses
        // if expected pts home team < expected pts visitor team
            // use money line to calculate winnings on a $100 bet
                // add winnings to total
        // else if expected pts home team > expected pts visitor team
            // use money line to calculate losses on a $100 bet
                // subtract losses from total
    let results = await oddStuff(stuff, stat);
}

compareStatExpectedResultsToGameResultsButton.onclick = async() => {
    let stat = 'plus_minus'
    let stuff = await compareStatExpectedResultsToGameResults(stat);

    // get expected points for each team
    // get moneyline for each team
    // if home team wins
        // if expected pts home team > expected pts visitor team 
            // use money line to calculate winnings on a $100 bet
                // add winnings to total
        // else if expected pts home team < expected pts visitor team
            // use money line to calculate losses on a $100 bet
                // subtract losses from total
    // else if home team loses
        // if expected pts home team < expected pts visitor team
            // use money line to calculate winnings on a $100 bet
                // add winnings to total
        // else if expected pts home team > expected pts visitor team
            // use money line to calculate losses on a $100 bet
                // subtract losses from total
    let results = await oddStuff(stuff, stat);
}


let total = 0;
const oddStuff = async(stuff, stat, hometeam, visitorteam) => {
    //[actualResults, p240ExpStatHome0, p240ExpStatVisitor0, p240ExpStatHome1, p240ExpStatVisitor1, pmActual0, pmActual1, plus_minus_expected0, plus_minus_expected1, season])


    let exPtsHome0 = stuff[1][stat];
    let exPtsVisitor0 = stuff[2][stat];
    let exPtsHome1;
    let exPtsVisitor1;
    if (stuff[3]) {
        exPtsHome1 = stuff[3][stat];
        exPtsVisitor1 = stuff[4][stat];
    }

    let season = stuff[9];
    let home_name;
    let home;
    let homesplit
    
    if (homeTeam.value !== "none") {
        home = homeTeam.value;
        homesplit = home.split(' ');
    } else {
        home = hometeam;
        homesplit = home.split(' ');
    }
    if (home === 'Los Angeles Lakers') {
        home_name = 'LALakers'
    } 
    else if (home === 'LA Clippers') {
        home_name = 'LAClippers';
    }
    else if (home === 'Portland Trail Blazers') {
        home_name = 'Portland';
    } 
    else if (homesplit.length === 3) {
        home_name = homesplit[0] + homesplit[1];
    } else {
        home_name = homesplit[0];
    }
    let visitor;
    let visitorSplit;
    let visitor_name;

    if (visitorteam) {
        visitor = visitorteam;
        visitorSplit = visitor.split(' ');
    } else {
        visitor = visitorTeam.value;
        visitorSplit = visitor.split(' ');
    }

    if (visitor === 'Los Angeles Lakers') {
        visitor_name = 'LALakers'
    }
    else if (visitor === 'LA Clippers') {
        visitor_name = 'LAClippers';
    }
    else if (visitor === 'Portland Trail Blazers') {
        visitor_name = 'Portland';
    } 
    else if (visitorSplit.length === 3) {
        visitor_name = visitorSplit[0] + visitorSplit[1];
    } else {
        visitor_name = visitorSplit[0];
    }
    let date = stuff[0][0].game_date;
    let splitDate = date.split('-');
    let gamedate = splitDate[1] + splitDate[2];
    if (gamedate.substring(0, 1) === '0') {
        gamedate = gamedate.substring(1)
    }

    let date2;
    let gamedate2;
    if (stuff[0][1]) {
        date2 = stuff[0][1].game_date;
        let splitDate2 = date2.split('-');
        gamedate2 = splitDate2[1] + splitDate2[2];
        if (gamedate2.substring(0, 1) === '0') {
            gamedate2 = gamedate2.substring(1)
        }
    }

    let moneylineHome = await getJsonResponseJackarithm(`/moneyline/home/${seasonDropChoice.value}/${home_name}/${gamedate}`);
    let moneylineVisitor = await getJsonResponseJackarithm(`/moneyline/visitor/${seasonDropChoice.value}/${visitor_name}/${gamedate}`);
    if (moneylineHome.length < 1) {
        moneylineHome = [{ml: '0'}];
        moneylineVisitor = [{ml: '0'}];
    } 
    
    moneylineHome = parseInt(moneylineHome[0].ml)
    if (moneylineVisitor.length < 1) {
        moneylineHome = [{ml: '0'}];
        moneylineVisitor = [{ml: '0'}];
    }

    moneylineVisitor = parseInt(moneylineVisitor[0].ml)

    let moneylineHome2;
    let moneylineVisitor2;
    
    if (parseInt(gamedate2) >= 0) {
        moneylineHome2 = await getJsonResponseJackarithm(`/moneyline/home/${seasonDropChoice.value}/${home_name}/${gamedate2}`);
        moneylineVisitor2 = await getJsonResponseJackarithm(`/moneyline/visitor/${seasonDropChoice.value}/${visitor_name}/${gamedate2}`);
        if (moneylineHome2.length < 1) {
            moneylineHome2 = [{ml: '0'}];
            moneylineVisitor2 = [{ml: '0'}];
        }
        moneylineHome2 = parseInt(moneylineHome2[0].ml);
        if (moneylineVisitor2.length < 1) {
            moneylineHome2 = [{ml: '0'}];
            moneylineVisitor2 = [{ml: '0'}];
        }
        moneylineVisitor2 = parseInt(moneylineVisitor2[0].ml);
    }



    // if home team wins
        // if expected pts home team > expected pts visitor team 
            // use money line to calculate winnings on a $100 bet
                // add winnings to total
        // else if expected pts home team < expected pts visitor team
            // use money line to calculate losses on a $100 bet
                // subtract losses from total
    // else if home team loses
        // if expected pts home team < expected pts visitor team
            // use money line to calculate winnings on a $100 bet
                // add winnings to total
        // else if expected pts home team > expected pts visitor team
            // use money line to calculate losses on a $100 bet
                // subtract losses from total
    let bet = 100;
    if (stuff[5] > 0) {
        if (exPtsHome0 > exPtsVisitor0) {
            let profit;
            if (moneylineHome < 0) {
                profit = Math.abs(bet / moneylineHome) * 100;
                total += profit;
            } else if (moneylineHome > 0) {
                profit = moneylineHome;
                total += profit;
            }
        } else if (exPtsHome0 < exPtsVisitor0) {
            let losses = 100;
            total -= losses;
        }
    } else if (stuff[5] < 0) {
        if (exPtsHome0 < exPtsVisitor0) {
            let profit;
            if (moneylineVisitor < 0) {
                profit = Math.abs(bet / moneylineVisitor) * 100;
                total += profit;
            } else if (moneylineVisitor > 0) {
                profit = moneylineVisitor;
                total += profit;
            }
        } else if (exPtsHome0 > exPtsVisitor0) {
            let losses = 100;
            total -= losses;
        }
    }

    if (stuff[6]) {
        let bet2 = 100;
        if (stuff[6] > 0) {
            if (exPtsHome1 > exPtsVisitor1) {
                let profit;
                if (moneylineHome2 < 0) {
                    profit = Math.abs(bet2 / moneylineHome2) * 100
                    total += profit;
                } else if (moneylineHome2 > 0) {
                    profit = moneylineHome2;
                    total += profit;
            
                }
            } else if (exPtsHome1 < exPtsVisitor1) {
                let losses = 100;
                total -= losses;
            }
        } else if (stuff[6] < 0) {

            if (exPtsHome1 < exPtsVisitor1) {
                let profit;
                if (moneylineVisitor2 < 0) {
                    profit = Math.abs(bet2 / moneylineVisitor2) * 100;
                    total += profit;
                 
                } else if (moneylineVisitor2 > 0) {
                    profit = moneylineVisitor2;
                    total += profit;
 
                }
            } else if (exPtsHome1 > exPtsVisitor1) {
                let losses = 100;
                total -= losses;
            }
        }
    }
    console.log(total);
}

let greenCountRegStat = 0;
const compareStatExpectedResultsToGameResults = async(stat, hometeam, visitorteam) => {
    let table = 'boxscorestraditional2021-2022';
    let stats = await getJsonResponseJackarithm(`/statsheaders/${table}`)

    let abbreviationHome;
    let abbreviationVisitor;

    if (hometeam) {
        abbreviationHome = await getJsonResponseJackarithm(`/teamabbreviation/${hometeam}`)
        abbreviationVisitor = await getJsonResponseJackarithm(`/teamabbreviation/${visitorteam}`)
    } else {
        abbreviationHome = await getJsonResponseJackarithm(`/teamabbreviation/${homeTeam.value}`)
        abbreviationVisitor = await getJsonResponseJackarithm(`/teamabbreviation/${visitorTeam.value}`)
    }

    let matchup1 = `${abbreviationHome[0].team_abbreviation} vs. ${abbreviationVisitor[0].team_abbreviation}`
    //get all games by game id, home team and visitor team
    let actualResults = await getJsonResponseJackarithm(`/actual/gameresult/${matchup1}/${seasonGameResults.value}`);
  
    let row1 = compareResultsTable.insertRow();
    let row2;
    if (actualResults.length > 1) { 
        row2 = compareResultsTable.insertRow();
    }
    await appendActualResults(actualResults, row1, row2);
    
    let gameDate0 = actualResults[0].game_date;

    let homeResults0 = await getStatExpectedNoAppend(stat, 'home', gameDate0, visitorteam);
    let expStatHome0 = homeResults0[0];
    let visitorResults0 = await getStatExpectedNoAppend(stat, 'visitor', gameDate0, visitorteam);
    let expStatVisitor0 = visitorResults0[0];
    
    let homeResults1;
    let expStatHome1;
    let visitorResults1;
    let expStatVisitor1;

    let gameDate1;
    if (actualResults.length > 1) {
        gameDate1 = actualResults[1].game_date;
        homeResults1 = await getStatExpectedNoAppend(stat, 'home', gameDate1, visitorteam);
        expStatHome1 = homeResults1[0];
        visitorResults1 = await getStatExpectedNoAppend(stat, 'visitor', gameDate1, visitorteam);
        expStatVisitor1 = visitorResults1[0];
    }
    let season = homeResults0[1];
    let color0;
    let color1;
    let plus_minus_expected0 = Object.values(expStatHome0)[0] - Object.values(expStatVisitor0)[0];
    let plus_minus_expected1;

    let plus_minus_actual0 = actualResults[0].plus_minus;
    let plus_minus_actual1;
    if (actualResults.length > 1) {
        plus_minus_actual1 = actualResults[1].plus_minus;
        plus_minus_expected1 = Object.values(expStatHome1)[0] - Object.values(expStatVisitor1)[0];
    }

    let pmActual0 = parseFloat(plus_minus_actual0)
    let pmActual1;
    if (actualResults.length > 1) {
        pmActual1 = parseFloat(plus_minus_actual1)
    }

    if (plus_minus_expected0 > 0.0) {
        color0 = 'red';
        if (pmActual0 > 0.0) {
            color0 = 'green';
            greenCountRegStat++;

        }
    }
    else if (plus_minus_expected0 < 0.0) {
        color0 = 'red';
        if (pmActual0 < 0.0) {
            color0 = 'green';
            greenCountRegStat++;

        }
    }

    if (pmActual1) {
        if (plus_minus_expected1 > 0.0) {
            color1 = 'red';
            if (pmActual1 > 0.0) {
                color1 = 'green';
                greenCountRegStat++;
    
            }
        }
        else if (plus_minus_expected1 < 0.0) {
            color1 = 'red';
            if (pmActual1 < 0.0) {
                color1 = 'green';
                greenCountRegStat++;
            }
        }
    }

    let percentage = greenCountRegStat / 41;
    console.log(percentage);

    for(let k = 0; k < actualResults.length; k++) {
        await appendExpectedToComparisonTable(expStatHome0, expStatVisitor0, expStatHome1, expStatVisitor1, plus_minus_expected0, plus_minus_expected1, color0, color1, row1, row2, k)
    }
    return ([actualResults, expStatHome0, expStatVisitor0, expStatHome1, expStatVisitor1, pmActual0, pmActual1, plus_minus_expected0, plus_minus_expected1, season])
}


let greenCount = 0;
const compareP240ExpectedResultsToGameResults = async(stat, hometeam, visitorteam) => {
    let table = 'boxscorestraditionalTEST10000Rows2017-2018';
    let table2 = 'boxscorestraditional2017-2018'
    let stats = await getJsonResponseJackarithm(`/statsheaders/${table}`)
    let stats2 = await getJsonResponseJackarithm(`/statsheaders/${table2}`)
    //console.log('stats after mvppoints database hit')
    let abbreviationHome;
    let abbreviationVisitor;

    if (hometeam) {
        abbreviationHome = await getJsonResponseJackarithm(`/teamabbreviation/${hometeam}`)
        abbreviationVisitor = await getJsonResponseJackarithm(`/teamabbreviation/${visitorteam}`)
    } else {
        hometeam = homeTeam.value;
        visitorteam = visitorTeam.value;
        abbreviationHome = await getJsonResponseJackarithm(`/teamabbreviation/${homeTeam.value}`)
        abbreviationVisitor = await getJsonResponseJackarithm(`/teamabbreviation/${visitorTeam.value}`)
    }

    let matchup1 = `${abbreviationHome[0].team_abbreviation} vs. ${abbreviationVisitor[0].team_abbreviation}`
    //get all games by game id, home team and visitor team

    let actualResults = await getJsonResponseJackarithm(`/actual/gameresult/${matchup1}/${seasonGameResults.value}`);

    if (actualResults.length === 0) {
        return;
    }
    let row1 = compareResultsTable.insertRow();
    let row2;
    if (actualResults.length > 1) { 
        row2 = compareResultsTable.insertRow();
    }
    await appendActualResults(actualResults, row1, row2);
    
    let gameDate0 = actualResults[0].game_date;

    let homeResults0 = await getStatP240ExpectedNoAppend(stat, 'home', gameDate0, hometeam, visitorteam);
    let p240ExpStatHome0 = homeResults0[0];
    let visitorResults0 = await getStatP240ExpectedNoAppend(stat, 'visitor', gameDate0, hometeam, visitorteam);
    let p240ExpStatVisitor0 = visitorResults0[0];
    
    let homeResults1;
    let p240ExpStatHome1;
    let visitorResults1;
    let p240ExpStatVisitor1;

    let gameDate1;
    if (actualResults.length > 1) {
        gameDate1 = actualResults[1].game_date;
        homeResults1 = await getStatP240ExpectedNoAppend(stat, 'home', gameDate1, hometeam, visitorteam);
        p240ExpStatHome1 = homeResults1[0];
        visitorResults1 = await getStatP240ExpectedNoAppend(stat, 'visitor', gameDate1, hometeam, visitorteam);
        p240ExpStatVisitor1 = visitorResults1[0];
    }
    let season = homeResults0[2];
    let color0;
    let color1;
    let plus_minus_expected0 = Object.values(p240ExpStatHome0)[0] - Object.values(p240ExpStatVisitor0)[0];
    let plus_minus_expected1;

    let plus_minus_actual0 = actualResults[0].plus_minus;
    let plus_minus_actual1;
    if (actualResults.length > 1) {
        plus_minus_actual1 = actualResults[1].plus_minus;
        plus_minus_expected1 = Object.values(p240ExpStatHome1)[0] - Object.values(p240ExpStatVisitor1)[0];
    }

    let pmActual0 = parseFloat(plus_minus_actual0)
    let pmActual1;
    if (actualResults.length > 1) {
        pmActual1 = parseFloat(plus_minus_actual1)
    }

    if (plus_minus_expected0 > 0.0) {
        color0 = 'red';
        if (pmActual0 > 0.0) {
            color0 = 'green';
            greenCount++;

        }
    }
    else if (plus_minus_expected0 < 0.0) {
        color0 = 'red';
        if (pmActual0 < 0.0) {
            color0 = 'green';
            greenCount++;

        }
    }

    if (pmActual1) {
        if (plus_minus_expected1 > 0.0) {
            color1 = 'red';
            if (pmActual1 > 0.0) {
                color1 = 'green';
                greenCount++;
    
            }
        }
        else if (plus_minus_expected1 < 0.0) {
            color1 = 'red';
            if (pmActual1 < 0.0) {
                color1 = 'green';
                greenCount++;
            }
        }
    }
    let H_or_V = 'home';
    let teamId = await getJsonResponseJackarithm(`/teamid/${hometeam}`)

    let gamesInSeasonCount = await getJsonResponseJackarithm(`/lengthofseason/${seasonDropChoice.value}/${teamId[0].team_id}/${H_or_V}`);
    gamesInSeasonCount = gamesInSeasonCount[0].count;
    let percentage = greenCount / gamesInSeasonCount;

    console.log(percentage);

    for(let k = 0; k < actualResults.length; k++) {
        await appendExpectedToComparisonTable(p240ExpStatHome0, p240ExpStatVisitor0, p240ExpStatHome1, p240ExpStatVisitor1, plus_minus_expected0, plus_minus_expected1, color0, color1, row1, row2, k)
    }
    return ([actualResults, p240ExpStatHome0, p240ExpStatVisitor0, p240ExpStatHome1, p240ExpStatVisitor1, pmActual0, pmActual1, plus_minus_expected0, plus_minus_expected1, season])
}

const appendActualResults = async(results, row1, row2) => {
    if (results.length > 1) {
        let cellActual1 = row1.insertCell();
        let cellActual2 = row2.insertCell();
        cellActual1.innerHTML = `${results[0].matchup} ${results[0].pts} ${results[0].plus_minus}`
        cellActual2.innerHTML = `${results[1].matchup} ${results[1].pts} ${results[1].plus_minus}`
    } else {
        let cellActual = row1.insertCell();
        cellActual.innerHTML = `${results[0].matchup} ${results[0].pts} ${results[0].plus_minus}`
    }
}

const appendExpectedToComparisonTable = async(p240Home0, p240Visitor0, p240Home1, p240Visitor1, plus_minus0, plus_minus1, color0, color1, row1, row2, k) => {
    let cellExpected2;
    if (k === 1) {
        cellExpected2 = row2.insertCell();
        cellExpected2.innerHTML = `${Object.values(p240Home1)[0]} ${Object.values(p240Visitor1)[0]} ${plus_minus1} ${color1}`

    } else {
        let cellExpected = row1.insertCell();
        cellExpected.innerHTML = `${Object.values(p240Home0)[0]} ${Object.values(p240Visitor0)[0]} ${plus_minus0} ${color0}`
    }
}

let statsArray = [];
const p240StatDropDownFunction = async() => {
    let table = 'boxscorestraditional2021-2022';
    let stats = await getJsonResponseJackarithm(`/statsheaders/${table}`)

    var str = '<option value="none" selected disabled hidden>Select an Option</option>';
    document.getElementById("p240StatDropDown").innerHTML = str;
    try {
        for (var stat of stats) {
            str += "<option>" + stat.column_name + "</option>";
            statsArray.push(stat);
        }
        document.getElementById("p240StatDropDown").innerHTML = str;
    } catch(error) {
        console.log(error);
    }
    
}


const getStatsFromBoxTraditionalHorV = async(season, playerid, H_or_V, table) => {
    let stats;
    if (table === 'mvpPoints') { 
        stats = await getJsonResponseJackarithm(`/jackarithm/mvpPoints/${playerid}/${season}/${H_or_V}`);
    } else {
        if (H_or_V === 'home') {
            //HEEERRRREEEE
            stats = await getJsonResponseJackarithm(`/jackarithm/home/boxscorestraditional/${playerid}/${season}`);
        } else {
            stats = await getJsonResponseJackarithm(`/jackarithm/visitor/boxscorestraditional/${playerid}/${season}`);
        }
    }
    return stats;
}

//for one player, return every stat average per season
const getPlayerHorVOffensiveStatAveragesTraditional = async(season, playerid, H_or_V, teamid, boxNum) => {
    let table1 = "boxscorestraditional2021-2022"
    let table2 = "boxscorestraditional2020-2021"
    let stats1 = await getJsonResponseJackarithm(`/statsheaders/${table1}`)
    let stats2 = await getJsonResponseJackarithm(`/statsheaders/${table2}`)

    let playerStats1 = await getStatsFromBoxTraditionalHorV(season, playerid, H_or_V, table1);
    let playerStats2 = await getStatsFromBoxTraditionalHorV(season, playerid, H_or_V, table2);
    
    playerStats1.splice(boxNum);
    console.log(playerStats1);
    playerStats2;
    /*if (!playerStats2[0]) {
        //games played = get gameid's in seasonDropChoice year where player.mins > 0
        //stat total = for each game in games played, add up stats
        /*let split = season.split('-')
        let next = parseInt(split[1]) + 1
        let thisSeason = split[1] + '-' + next;*/
        /*let split = season.split('-')
        let previous = parseInt(split[1]) - 1;
        let previous2 = parseInt(split[0]) - 1;
        let thisSeason = previous2 + '-' + previous;
        playerStats2 = await getStatsFromBoxTraditionalHorV(thisSeason, playerid, H_or_V, table2);
    }*/

    let temp;
    if (!playerStats1[0]) {
        temp = playerStats2;
        playerStats1 = temp;
        console.log('PLAYER STATS SWAPPED BECAUSE PLAYERSTATS1 DOES NOT EXIST')
    }
    /*
    if (!playerStats1[0]) {
        playerStats1 = [{mvppoints: '0.2500'}]
    }
    */

    let averagesObjectAny1 = {};
    let averagesObject_82Any1 = {};
    let averagesObjectAny2 = {};
    let averagesObject_82Any2 = {};

    let stats_82_1 = [];
    let statsPerGame1 = [];
    let statsHeaders1 = [];

    let stats_82_2 = [];
    let statsPerGame2 = [];
    let statsHeaders2 = [];

    for (let j = 0; j < stats1.length; j++) {

        statsHeaders1.push(stats1[j].column_name)
        stats_82_1.push(0);
        statsPerGame1.push(0);

    }    

    for (let n = 0; n < stats2.length; n++) {

        statsHeaders2.push(stats2[n].column_name)
        stats_82_2.push(0);
        statsPerGame2.push(0);

    } 
    
    let gameCount2 = 0;
    for (let i = 0; i < playerStats2.length; i++) {
        if (parseFloat(playerStats2[i].min) > 0) {
            gameCount2++;
        }
        if (!playerStats2[i].min) {
            playerStats2[i].min = 0;
        }
        for (let j = 0; j < stats2.length; j++) {
            if (stats2[j].column_name === 'points') {
                stats2[j].column_name = 'pts';
            }
            if (!parseFloat(playerStats2[i][stats2[j].column_name])) {
                playerStats2[i][stats2[j].column_name] = 0;
            }
            
            stats_82_2[j] += parseFloat(playerStats2[i][stats2[j].column_name]);
            
            if (parseFloat(playerStats2[i].min) > 0) {
                statsPerGame2[j] += parseFloat(playerStats2[i][stats2[j].column_name]);
            }
        }
    }
    let gameCount1 = 0;
    for (let i = 0; i < playerStats1.length; i++) {
        if (parseFloat(playerStats1[i].min) > 0) {
            gameCount1++;
        }
        if (!playerStats1[i].min) {
            playerStats1[i].min = 0;
        }
        for (let j = 0; j < stats1.length; j++) {
            if (stats1[j].column_name === 'points') {
                stats1[j].column_name = 'pts';
            }
            if (!parseFloat(playerStats1[i][stats1[j].column_name])) {
                playerStats1[i][stats1[j].column_name] = 0;
            }
            
            stats_82_1[j] += parseFloat(playerStats1[i][stats1[j].column_name]);
            
            if (parseFloat(playerStats1[i].min) > 0) {
                statsPerGame1[j] += parseFloat(playerStats1[i][stats1[j].column_name]);
            }
        }
    }

    teamid = teamid[0].team_id;
    
    //*******DURING THE SEASON/PRODUCTION, YOU'LL JUST HAVE TO CHANGE 'GAMESINSEASONCOUNT' TO 82, OR 41, DOUBLE CHECK.
    let gamesInSeasonCount = await getJsonResponseJackarithm(`/lengthofseason/${seasonDropChoice.value}/${teamid}/${H_or_V}`);

    gamesInSeasonCount = gamesInSeasonCount[0].count;

    let header2;
    let statAverage2
    let statAverage_82_2
0
    let header1;
    let statAverage1;
    let statAverage_82_1;
    
    if (playerStats1 !== playerStats2) {
        /*header1 = statsHeaders1[4];
        statAverage_82_1 = parseFloat(playerStats1[0].plus_minus);
        statAverage1 = parseFloat(playerStats1[0].plus_minus);
        console.log(statAverage1)
        console.log(statAverage_82_1)
        averagesObjectAny1[header1] = statAverage1;
        averagesObject_82Any1[header1] = statAverage_82_1;*/
        for (let y = 0; y < stats_82_1.length; y++) {
            header1 = statsHeaders1[y];
            statAverage_82_1 = stats_82_1[y] / gamesInSeasonCount;
            statAverage1 = statsPerGame1[y] / gameCount1;

            averagesObjectAny1[header1] = statAverage1;
            averagesObject_82Any1[header1] = statAverage_82_1;
        }
        for (let k = 0; k < stats_82_2.length; k++) {
            header2 = statsHeaders2[k];
            statAverage_82_2 = stats_82_2[k] / gamesInSeasonCount;
            statAverage2 = statsPerGame2[k] / gameCount2;

            averagesObjectAny2[header2] = statAverage2;
            averagesObject_82Any2[header2] = statAverage_82_2;
        }
    } else {
        for (let k = 0; k < stats_82_2.length; k++) {
            header2 = statsHeaders2[k];
            statAverage_82_2 = stats_82_2[k] / gamesInSeasonCount;
            statAverage2 = statsPerGame2[k] / gameCount2;

            averagesObjectAny2[header2] = statAverage2;
            averagesObject_82Any2[header2] = statAverage_82_2;
        }
    }

    return [averagesObjectAny2, averagesObject_82Any2, averagesObjectAny1, averagesObject_82Any1];
}

const getSports = async() => {
    let odds = await fetch(`https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=${process.env.ODDSAPIKEY}&regions=us`, {
        method: 'GET',
    })
    if (odds.ok) {
        let jsonOdds = odds.json();
        return jsonOdds;
    }
}

const postOdds = async(odds, season) => {

    const url = `/odds/${season}`;
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(odds),
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

const writeOddsToDatabase = async(season) => {
    let odds = await getJsonResponseJackarithm(`/odds/${season}`);
    //date rot vh team 1 2 3 4 final open close ml 2h
    for (let i = 0; i < odds.length; i++) {
        let oddsValues = Object.values(odds[i])[0];
        let splitValues = oddsValues.split(" ");
        let x = splitValues[0].split('\t');
        let results = await postOdds(x, season);
    }

}

writeOddsToDatabaseButton.onclick = async() => {
    let season = '2020-2021';
    await writeOddsToDatabase(season);
}

const getAverageMvpPointsBySeason = async(season) => {
   
    let total = 0;
    let points = await getJsonResponseJackarithm(`/getAllMvpPoints/${season}`);
    console.log(points)
    for (let i = 0; i < points.length; i++) {
        let pts = parseFloat(points[i].mvppoints)
        if (!pts) {
            continue;
        }
        console.log(pts);
        total += pts;
    }
    let average = total / points.length;
    console.log(average);
}
teamsDropDown();
p240StatDropDownFunction();
//getAverageMvpPointsBySeason('2016-2017');