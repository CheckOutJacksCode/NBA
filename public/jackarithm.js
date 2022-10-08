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

const getStatP240ExpectedNoAppend = async(stat, H_or_V) => {
    let team;
    if (H_or_V === 'home') {
        team = homeTeam.value;
    } else {
        team = visitorTeam.value;
    }

    let season = '2017-2018';
    let teamId = await getJsonResponseJackarithm(`/teamid/${team}`)
    let totalMinutes = 0;
    let totalMinutes_82 = 0;
    let totalStat = 0;
    let totalStat_82 = 0;
    let roster = await getJsonResponseJackarithm(`/getroster/${seasonDropChoice.value}/${teamId[0].team_id}`);

    for (let i = 0; i < roster.length; i++) {
        let playerStats = await getPlayerHorVOffensiveStatAveragesTraditional(season, roster[i].player_id, H_or_V);
        totalMinutes += playerStats[0].min;
        //total of minutes per 82 games of every player on roster
        totalMinutes_82 += playerStats[1].min;
        totalStat += playerStats[0][stat];
        totalStat_82 += playerStats[1][stat];
    }
    let ratio_82 = totalStat_82 / totalMinutes_82;
    let statPer240Expected = ratio_82 * 240;
    let statObject = {};
    statObject[stat] = statPer240Expected;
    return [statObject, season]
}

compareP240ExpectedResultsToGameResultsButton.onclick = async() => {
    let stat = 'pts'

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
    console.log('hello');
    console.log(stuff);
    let results = await oddStuff(stuff);
}

let total = 0;
const oddStuff = async(stuff) => {
    let exPtsHome = stuff[1].pts;
    let exPtsVisitor = stuff[2].pts;
    let season = stuff[6];
    let home = homeTeam.value;
    let homesplit = home.split(' ');
    let home_name;
    if (homesplit.length === 3) {
        home_name = homesplit[0] + homesplit[1];
    } else {
        home_name = homesplit[0];
    }
    let visitor = visitorTeam.value;
    let visitorsplit = visitor.split(' ');
    let visitor_name;
    if (visitorsplit.length === 3) {
        visitor_name = visitorsplit[0] + visitorsplit[1];
    } else {
        visitor_name = visitorsplit[0];
    }
    let date = stuff[0][0].game_date;
    let splitDate = date.split('-');
    let gamedate = splitDate[1] + splitDate[2];
    console.log(gamedate);
    if (gamedate.substring(0, 1) === '0') {
        gamedate = gamedate.substring(1)
    }
    let moneylineHome = await getJsonResponseJackarithm(`/moneyline/home/${seasonDropChoice.value}/${home_name}/${gamedate}`);
    let moneylineVisitor = await getJsonResponseJackarithm(`/moneyline/visitor/${seasonDropChoice.value}/${visitor_name}/${gamedate}`)
    console.log(moneylineHome)
    console.log(moneylineVisitor)
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
    if (stuff[3] > 0) {
        if (exPtsHome > exPtsVisitor) {
            let bet = 100;
            if (moneylineHome < 0) {
                let profit = abs(bet / moneylineHome)
                console.log(profit)
            }
        }
    }
}

let greenCount = 0;
const compareP240ExpectedResultsToGameResults = async(stat) => {
    let table = 'boxscorestraditional2021-2022';
    let stats = await getJsonResponseJackarithm(`/statsheaders/${table}`)
    let abbreviationHome = await getJsonResponseJackarithm(`/teamabbreviation/${homeTeam.value}`)
    let abbreviationVisitor = await getJsonResponseJackarithm(`/teamabbreviation/${visitorTeam.value}`)
    let matchup1 = `${abbreviationHome[0].team_abbreviation} vs. ${abbreviationVisitor[0].team_abbreviation}`
 
    //get all games by game id, home team and visitor team
    let actualResults = await getJsonResponseJackarithm(`/actual/gameresult/${matchup1}/${seasonGameResults.value}`);
    console.log(actualResults);
  
    let row1 = compareResultsTable.insertRow();
    let row2;
    if (actualResults.length > 1) { 
        row2 = compareResultsTable.insertRow();
    }
    await appendActualResults(actualResults, row1, row2);
    
    let homeResults = await getStatP240ExpectedNoAppend(stat, 'home');
    let p240ExpStatHome = homeResults[0];
    let visitorResults = await getStatP240ExpectedNoAppend(stat, 'visitor');
    let p240ExpStatVisitor = visitorResults[0];
    let season = homeResults[1];
    let color0;
    let color1;
    let plus_minus_expected = Object.values(p240ExpStatHome)[0] - Object.values(p240ExpStatVisitor)[0];
    let plus_minus_actual0 = actualResults[0].plus_minus;
    let plus_minus_actual1;
    if (actualResults.length > 1) {
        plus_minus_actual1 = actualResults[1].plus_minus;
    }

    let pmActual0 = parseFloat(plus_minus_actual0)
    let pmActual1;
    if (actualResults.length > 1) {
        pmActual1 = parseFloat(plus_minus_actual1)
    }

    if (plus_minus_expected > 0.0) {
        color0 = 'red';
        if (pmActual0 > 0.0) {
            color0 = 'green';
            greenCount++;

        }
    }
    else if (plus_minus_expected < 0.0) {
        color0 = 'red';
        if (pmActual0 < 0.0) {
            color0 = 'green';
            greenCount++;

        }
    }

    if (pmActual1) {
        if (plus_minus_expected > 0.0) {
            color1 = 'red';
            if (pmActual1 > 0.0) {
                color1 = 'green';
                greenCount++;
    
            }
        }
        else if (plus_minus_expected < 0.0) {
            color1 = 'red';
            if (pmActual1 < 0.0) {
                color1 = 'green';
                greenCount++;
    
            }
        }
    }

    let percentage = greenCount / 41;
    console.log(percentage);
    for(let k = 0; k < actualResults.length; k++) {
        await appendExpectedToComparisonTable(p240ExpStatHome, p240ExpStatVisitor, plus_minus_expected, color0, color1, row1, row2, k)
    }
    return ([actualResults, p240ExpStatHome, p240ExpStatVisitor, pmActual0, pmActual1, plus_minus_expected, season])
}

const appendActualResults = async(results, row1, row2) => {
    if (results.length > 1) {
        let cellActual1 = row1.insertCell();
        let cellActual2 = row2.insertCell();
        console.log(results);
        cellActual1.innerHTML = `${results[0].matchup} ${results[0].pts} ${results[0].plus_minus}`
        cellActual2.innerHTML = `${results[1].matchup} ${results[1].pts} ${results[1].plus_minus}`
    } else {
        let cellActual = row1.insertCell();
        console.log(results);
        cellActual.innerHTML = `${results[0].matchup} ${results[0].pts} ${results[0].plus_minus}`
    }
}

const appendExpectedToComparisonTable = async(p240Home, p240Visitor, plus_minus, color0, color1, row1, row2, k) => {
    let cellExpected2;
    console.log(k);
    if (k === 1) {
        cellExpected2 = row2.insertCell();
        cellExpected2.innerHTML = `${Object.values(p240Home)[0]} ${Object.values(p240Visitor)[0]} ${plus_minus} ${color1}`

    } else {
        let cellExpected = row1.insertCell();

        console.log(Object.values(p240Home))
        console.log(p240Visitor)
        console.log(plus_minus)
        cellExpected.innerHTML = `${Object.values(p240Home)[0]} ${Object.values(p240Visitor)[0]} ${plus_minus} ${color0}`
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


const getStatsFromBoxTraditionalHorV = async(season, playerid, H_or_V) => {
    let stats;

    if (H_or_V === 'home') {
        stats = await getJsonResponseJackarithm(`/jackarithm/home/boxscorestraditional/${playerid}/${season}`);
    } else {
        stats = await getJsonResponseJackarithm(`/jackarithm/visitor/boxscorestraditional/${playerid}/${season}`);
    }

    return stats;
}

//for one player, return every stat average per season
const getPlayerHorVOffensiveStatAveragesTraditional = async(season, playerid, H_or_V) => {
    let table = 'boxscorestraditional2021-2022'
    let stats = await getJsonResponseJackarithm(`/statsheaders/${table}`)
    season = '2017-2018';
    let playerStats = await getStatsFromBoxTraditionalHorV(season, playerid, H_or_V);
    
    let averagesObjectAny = {};
    let averagesObject_82Any = {};
 
    let gameCount = 0;
    let stats_82 = [];
    let statsPerGame = [];
    let statsHeaders = [];

    for (let j = 0; j <stats.length; j++) {

        statsHeaders.push(stats[j].column_name)
        stats_82.push(0);
        statsPerGame.push(0);

    }    
    
    for (let i = 0; i < playerStats.length; i++) {
    
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
    }

    for (let k = 0; k < stats_82.length; k++) {
        let header = statsHeaders[k];
        let statAverage_82 = stats_82[k] / 41;
        let statAverage = statsPerGame[k] / gameCount;

        averagesObjectAny[header] = statAverage;
        averagesObject_82Any[header] = statAverage_82;

    }
    return [averagesObjectAny, averagesObject_82Any];
}

const getSports = async() => {
    let odds = await fetch('https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=e608b4f8686dca79c52e27f32388a938&regions=us', {
        method: 'GET',
    })
    if (odds.ok) {
        let jsonOdds = odds.json();
        console.log(jsonOdds)
        return jsonOdds;
    }
}

const postOdds = async(odds, season) => {
    console.log(odds);
    console.log(season);
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
    console.log(odds);
    //date rot vh team 1 2 3 4 final open close ml 2h
    for (let i = 0; i < odds.length; i++) {
        let oddsValues = Object.values(odds[i])[0];
        console.log(oddsValues)
        let splitValues = oddsValues.split(" ");
        console.log(splitValues);
        let x = splitValues[0].split('\t');
        console.log(x);
        let results = await postOdds(x, season);
    }

}

writeOddsToDatabaseButton.onclick = async() => {
    let season = '2020-2021';
    await writeOddsToDatabase(season);
}

teamsDropDown();
p240StatDropDownFunction();
