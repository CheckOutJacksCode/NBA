const homeRosterTable = document.getElementById("seasonHomeTeamRosterTable");
const visitorRosterTable = document.getElementById("seasonHomeTeamRosterTable");
const boxTraditionalSeasonAverageTableHome = document.getElementById("boxTraditionalSeasonAverageTableHome");
const boxTraditionalSeasonAverageTable_82Home = document.getElementById("boxTraditionalSeasonAverageTable_82Home");
const boxTraditionalSeasonAverageTableVisitor = document.getElementById("boxTraditionalSeasonAverageTableVisitor");
const boxTraditionalSeasonAverageTable_82Visitor = document.getElementById("boxTraditionalSeasonAverageTable_82Visitor");
const homeTeamSeasonGameResults = document.getElementById("gameResultsHomeTeamPerSeason");
const visitorTeamSeasonGameResults = document.getElementById("gameResultsVisitorTeamPerSeason");
const homeTeamSeasonGameResultsTable = document.getElementById("gameResultsHomeTeamPerSeasonTable");
const visitorTeamSeasonGameResultsTable = document.getElementById("gameResultsVisitorTeamPerSeasonTable");
const gameResultsHomeTeamPerSeasonExpectedTable = document.getElementById("gameResultsHomeTeamPerSeasonExpectedTable");
const getBoxTraditionalButton = document.getElementById("getBoxTraditionalButton");
const getP240ExpectedButton = document.getElementById("getP240ExpectedButton");
const p240StatSelected = document.getElementById("p240StatDropDown");
const boxTraditionalSeasonAverageTable = document.getElementById("boxTraditionalSeasonAverageTable");
const boxTraditionalSeasonAverageTable_82 = document.getElementById("boxTraditionalSeasonAverageTable_82");

const getJsonResponseJackarithm = async (url) => {
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

const getRosterNoParams = async(H_or_V) => {
    let team = document.getElementById(`${H_or_V}TeamJackarithm`);
    let teamId = await getJsonResponse(`/teamid/${team.value}`)
    let season = '2017-2018';
    let roster = await getJsonResponseJackarithm(`/getroster/${season}/${teamId[0].team_id}`);
    for (let i = 0; i < roster.length; i++) {
        let appendedPlayer = await appendPlayerRosterTable(roster[i].player_id, roster[i].player_name, H_or_V);
    }
}

getBoxTraditionalButton.onclick = async() => {
    let H_or_V;
    if (document.getElementById("homeTeamJackarithm") !== 'Select an Option') {
        H_or_V = 'home';
    } else if (document.getElementById("visitorTeamJackarithm") !== 'Select an Option') {
        H_or_V = 'visitor';
    }
    let team = document.getElementById(`${H_or_V}TeamJackarithm`);
    let teamId = await getJsonResponse(`/teamid/${team.value}`)
    let season = '2017-2018';
    let roster = await getJsonResponseJackarithm(`/getroster/${season}/${teamId[0].team_id}`);
    console.log(roster)
    for (let i = 0; i < roster.length; i++) {
        let playerStats = await getPlayerSeasonOffensiveStatAveragesTraditional(season, roster[i].player_id, H_or_V);
        console.log(playerStats)
        await appendPlayerBoxTraditionalSeasonAverageTable(playerStats, roster[i].player_name, H_or_V);
    }
}


//for one player, return every stat average per season
const getPlayerSeasonOffensiveStatAveragesTraditional = async(season, playerid, H_or_V) => {
    let table = 'boxscorestraditional2021-2022'
    let stats = await getJsonResponseJackarithm(`/statsheaders/${table}`)
    season = '2017-2018';
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
        console.log(horv_gameids);

        let result = horv_gameids.map(a => a.game_id);
        console.log(result);
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
    for (let k = 0; k < stats_82.length; k++) {
        let header = statsHeaders[k];
        let statAverage_82 = stats_82[k] / 82;
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


const appendPlayerBoxTraditionalSeasonAverageTable = async(objArray, player_name, H_or_V) => {
    let nameRow
    let headerRow
    let statRow
    let separationRow
    let nameRow_82 
    let headerRow_82 
    let statRow_82 
    let separationRow_82
 
    if (H_or_V === 'home') {
        nameRow = boxTraditionalSeasonAverageTableHome.insertRow(0);
        headerRow = boxTraditionalSeasonAverageTableHome.insertRow(1);
        statRow = boxTraditionalSeasonAverageTableHome.insertRow(2);
        separationRow = boxTraditionalSeasonAverageTableHome.insertRow(3);
        nameRow_82 = boxTraditionalSeasonAverageTable_82Home.insertRow(0);
        headerRow_82 = boxTraditionalSeasonAverageTable_82Home.insertRow(1);
        statRow_82 = boxTraditionalSeasonAverageTable_82Home.insertRow(2);
        separationRow_82 = boxTraditionalSeasonAverageTableHome.insertRow(3);
    } else if (H_or_V === 'visitor') {
        nameRow = boxTraditionalSeasonAverageTableVisitor.insertRow(0);
        headerRow = boxTraditionalSeasonAverageTableVisitor.insertRow(1);
        statRow = boxTraditionalSeasonAverageTableVisitor.insertRow(2);
        separationRow = boxTraditionalSeasonAverageTableVisitor.insertRow(3);
        nameRow_82 = boxTraditionalSeasonAverageTable_82Visitor.insertRow(0);
        headerRow_82 = boxTraditionalSeasonAverageTable_82Visitor.insertRow(1);
        statRow_82 = boxTraditionalSeasonAverageTable_82Visitor.insertRow(2);
        separationRow_82 = boxTraditionalSeasonAverageTableVisitor.insertRow(3);
    }

    let nameRowSeason = boxTraditionalSeasonAverageTable.insertRow(0);
    let headerRowSeason = boxTraditionalSeasonAverageTable.insertRow(1);
    let statRowSeason = boxTraditionalSeasonAverageTable.insertRow(2);
    let separationRowSeason = boxTraditionalSeasonAverageTable.insertRow(3);
    let nameRow_82Season = boxTraditionalSeasonAverageTable_82.insertRow(0);
    let headerRow_82Season = boxTraditionalSeasonAverageTable_82.insertRow(1);
    let statRow_82Season = boxTraditionalSeasonAverageTable_82.insertRow(2);
    let separationRow_82Season = boxTraditionalSeasonAverageTable.insertRow(3);

    for (let i = 0; i < Object.keys(objArray[0]).length; i++) {
        let cell0 = nameRow.insertCell(i)
        let cell1 = headerRow.insertCell(i)
        let cell2 = statRow.insertCell(i)

        let cell3 = nameRowSeason.insertCell(i)
        let cell4 = headerRowSeason.insertCell(i)
        let cell5 = statRowSeason.insertCell(i)

        cell0.innerHTML = player_name
        cell1.innerHTML = Object.keys(objArray[0])[i]
        cell2.innerHTML = Object.values(objArray[0])[i]

        cell3.innerHTML = player_name
        cell4.innerHTML = Object.keys(objArray[2])[i]
        cell5.innerHTML = Object.values(objArray[2])[i]

        let cell6 = nameRow_82.insertCell(i)
        let cell7 = headerRow_82.insertCell(i)
        let cell8 = statRow_82.insertCell(i)
        
        let cell9 = nameRow_82Season.insertCell(i)
        let cell10 = headerRow_82Season.insertCell(i)
        let cell11 = statRow_82Season.insertCell(i)

        cell6.innerHTML = player_name
        cell7.innerHTML = Object.keys(objArray[1])[i]
        cell8.innerHTML = Object.values(objArray[1])[i]

        cell9.innerHTML = player_name
        cell10.innerHTML = Object.keys(objArray[3])[i]
        cell11.innerHTML = Object.values(objArray[3])[i]
    }
    return 'appended';
}

let teamArray = [];
const teamsDropDown = async() => {

    let teams = await getJsonResponseJackarithm('/teamnames');
    console.log(teams)
    var str = '<option value="none" selected disabled hidden>Select an Option</option>';
    document.getElementById("homeTeamJackarithm").innerHTML = str;
    document.getElementById("visitorTeamJackarithm").innerHTML = str;
    document.getElementById("gameResultsHomeTeamPerSeason").innerHTML = str;
    document.getElementById("gameResultsVisitorTeamPerSeason").innerHTML = str;

    try {
      for (var team of teams) {
        str += "<option>" + team.team_name + "</option>";
        teamArray.push(team.team_name);
      }
      document.getElementById("homeTeamJackarithm").innerHTML = str;
      document.getElementById("visitorTeamJackarithm").innerHTML = str;
      document.getElementById("gameResultsHomeTeamPerSeason").innerHTML = str;
      document.getElementById("gameResultsVisitorTeamPerSeason").innerHTML = str;

    } catch(error) {
      console.log(error);
    }
}

const getSeasonGameResultsByTeamHome = async() => {
    let homeTeam = homeTeamSeasonGameResults.value;
    let season = seasonGameResults.value;
    //get league games

    let results = await getJsonResponseJackarithm(`/jackarithm/gameResults/home/${homeTeam}/${season}`)

    let headers = homeTeamSeasonGameResultsTable.insertRow();
    for (let j = 0; j < Object.keys(results[0]).length; j++) {
        let cell = headers.insertCell(j);
        cell.innerHTML = Object.keys(results[0])[j];
    }
    for (let i = 0; i < results.length; i++) {
        let appendedGame = await appendSeasonGameResults(results[i]);
    }
}

const appendSeasonGameResults = async(game) => {

    let row = homeTeamSeasonGameResultsTable.insertRow();
    for (let i = 0; i < Object.keys(game).length; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = Object.values(game)[i];
    }
    return (game);

}

const getSeasonGameResultsByTeamVisitor = async() => {
    let visitorTeam = visitorTeamSeasonGameResults.value;

    //get league games
    console.log(visitorTeam)
    console.log(season)
    let results = await getJsonResponseJackarithm(`/jackarithm/gameResults/visitor/${visitorTeam}/${season}`)
    console.log(results);
}

const getGameResultsHomeTeamPerSeasonExpectedTable = async() => {
    let homeTeam = homeTeamSeasonGameResults.value;
    let season = seasonGameResults.value;
    //get league games
    //get roster expected output
    //roster average per game output
    let results = await getJsonResponseJackarithm(`/jackarithm/gameResults/home/${homeTeam}/${season}`)

    let headers = homeTeamSeasonGameResultsTable.insertRow();
    for (let j = 0; j < Object.keys(results[0]).length; j++) {
        let cell = headers.insertCell(j);
        cell.innerHTML = Object.keys(results[0])[j];
    }
    for (let i = 0; i < results.length; i++) {
        let appendedGame = await appendSeasonGameResults(results[i]);
    }
}


getP240ExpectedButton.onclick = async() => {
    let stat = p240StatSelected.value;
    let results = getStatP240Expected(stat);
    console.log(results)
}

const appendExpectedPoints = async(team, pp240expected) => {
    let row = gameResultsHomeTeamPerSeasonExpectedTable.insertRow();
    let cell = row.insertCell(0)
    cell.innerHTML = team;
    let cell2 = row.insertCell(1)
    cell2.innerHTML = pp240expected;
    console.log(team);
    console.log(pp240expected);
}


const getStatP240Expected = async(stat) => {
    let teams = await getJsonResponseJackarithm('/teamnames');
    console.log(teams);
    let season = '2017-2018';
    for (let x = 0; x < teams.length; x++) {
        let teamId = await getJsonResponseJackarithm(`/teamid/${teams[x].team_name}`)
        console.log(teamId);
        let totalMinutes = 0;
        let totalMinutes_82 = 0;
        let totalStat = 0;
        let totalStat_82 = 0;
        let roster = await getJsonResponseJackarithm(`/getroster/${season}/${teamId[0].team_id}`);
        console.log(roster);
        for (let i = 0; i < roster.length; i++) {
            let playerStats = await getPlayerSeasonOffensiveStatAveragesTraditional(season, roster[i].player_id);
            console.log(playerStats)
            totalMinutes += playerStats[0].min;
            //total of minutes per 82 games of every player on roster
            if (stat === 'pts') {
                stat = 'points';
            }
            totalMinutes_82 += playerStats[1].min;
            totalStat += playerStats[0][stat];
            totalStat_82 += playerStats[1][stat];
        }
        let ratio_82 = totalStat_82 / totalMinutes_82;
        console.log(totalMinutes)
        console.log(totalStat)
        console.log(totalMinutes_82)
        console.log(totalStat_82)

        let statPer240Expected = ratio_82 * 240;
        console.log(statPer240Expected);
        console.log(teams[x].team_name)
        let results = await appendExpectedPoints(teams[x].team_name, statPer240Expected);
    }
}

let statsArray = [];
const p240StatDropDownFunction = async() => {
    let table = 'boxscorestraditional2021-2022';
    console.log(table);
    let stats = await getJsonResponseJackarithm(`/statsheaders/${table}`)
    console.log(stats);

    var str = '<option value="none" selected disabled hidden>Select an Option</option>';
    document.getElementById("p240StatDropDown").innerHTML = str;
    try {
        for (var stat of stats) {
            console.log(stat);
            str += "<option>" + stat.column_name + "</option>";
            statsArray.push(stat);
        }
        document.getElementById("p240StatDropDown").innerHTML = str;
    } catch(error) {
        console.log(error);
    }
    
}


teamsDropDown();
p240StatDropDownFunction();
//getRoster("2021-2022", "1610612744");
