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
const getPP240ExpectedButton = document.getElementById("getPP240ExpectedButton")


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
    if (document.getElementById("homeTeamJackarith") !== 'Select an Option') {
        H_or_V = 'home';
    } else if (document.getElementById("visitorTeamJackarith") !== 'Select an Option') {
        H_or_V = 'visitor';
    }
    let team = document.getElementById(`${H_or_V}TeamJackarithm`);
    let teamId = await getJsonResponse(`/teamid/${team.value}`)
    let season = '2017-2018';
    let roster = await getJsonResponseJackarithm(`/getroster/${season}/${teamId[0].team_id}`);
    for (let i = 0; i < roster.length; i++) {
        let playerStats = await getPlayerSeasonOffensiveStatAveragesTraditional(season, roster[i].player_id);

        await appendPlayerBoxTraditionalSeasonAverageTable(playerStats, roster[i].player_name, H_or_V);
    }
}

getPP240ExpectedButton.onclick = async() => {
    let results = getPP240Expected();
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

const getPlayerSeasonOffensiveStatAveragesTraditional = async(season, playerid) => {
    let seasonStats = await getStatsFromBoxTraditional(season, playerid);
    let gameCount = 0;
    let points = 0;
    let min = 0;
    let fga = 0;
    let fgm = 0;
    let fgp = 0;
    let fta = 0;
    let ftm = 0;
    let ftp = 0;
    let fg3_pct = 0;
    let fg3a = 0;
    let fg3m = 0;
    let totreb = 0;
    let assists = 0;
    let steals = 0;
    let turnovers = 0;
    let blocks = 0;
    let plusminus = 0;
    let pfouls = 0;

    let points_82 = 0;
    let min_82 = 0;
    let fga_82 = 0;
    let fgm_82 = 0;
    let fgp_82 = 0;
    let fta_82 = 0;
    let ftm_82 = 0;
    let ftp_82 = 0;
    let fg3_pct_82 = 0;
    let fg3a_82 = 0;
    let fg3m_82 = 0;
    let totreb_82 = 0;
    let assists_82 = 0;
    let steals_82 = 0;
    let turnovers_82 = 0;
    let blocks_82 = 0;
    let plusminus_82 = 0;
    let pfouls_82 = 0;
    
    for (let i = 0; i < seasonStats.length; i++) {
        points_82 += parseFloat(seasonStats[i].pts)
        min_82 += parseFloat(seasonStats[i].min)
        fga_82 += parseFloat(seasonStats[i].fga)
        fgm_82 += parseFloat(seasonStats[i].fgm)
        fgp_82 += parseFloat(seasonStats[i].fg_pct);

        fg3a_82 += parseFloat(seasonStats[i].fg3a)
        fg3m_82 += parseFloat(seasonStats[i].fg3m)
        fg3_pct_82 += parseFloat(seasonStats[i].fg3_pct);
  
        fta_82 += parseFloat(seasonStats[i].fta)
        ftm_82 += parseFloat(seasonStats[i].ftm)
        ftp_82 += parseFloat(seasonStats[i].ft_pct);
  
        totreb_82 += parseFloat(seasonStats[i].reb) 
        assists_82 += parseFloat(seasonStats[i].ast)
        steals_82 += parseFloat(seasonStats[i].stl) 
        turnovers_82 += parseFloat(seasonStats[i].turnovers)
        blocks_82 += parseFloat(seasonStats[i].blk)
        plusminus_82 += parseFloat(seasonStats[i].plus_minus);
        pfouls_82 += parseFloat(seasonStats[i].pf)
        
        console.log(points_82)
        console.log(min_82)
        
        if (parseFloat(seasonStats[i].min) > 0) {
            gameCount++;

            points += parseFloat(seasonStats[i].pts)
            min += parseFloat(seasonStats[i].min)
            fga += parseFloat(seasonStats[i].fga)
            fgm += parseFloat(seasonStats[i].fgm)
            fgp += parseFloat(seasonStats[i].fg_pct);

            fg3a += parseFloat(seasonStats[i].fg3a)
            fg3m += parseFloat(seasonStats[i].fg3m)
            fg3_pct += parseFloat(seasonStats[i].fg3_pct);
      
            fta += parseFloat(seasonStats[i].fta)
            ftm += parseFloat(seasonStats[i].ftm)
            ftp += parseFloat(seasonStats[i].ft_pct);
      
            totreb += parseFloat(seasonStats[i].reb) 
            assists += parseFloat(seasonStats[i].ast)
            steals += parseFloat(seasonStats[i].stl) 
            turnovers += parseFloat(seasonStats[i].turnovers)
            blocks += parseFloat(seasonStats[i].blk)
            plusminus += parseFloat(seasonStats[i].plus_minus);
            pfouls += parseFloat(seasonStats[i].pf)
        }
    }
    console.log(points_82)
    console.log(points)

    points_82 = points / 82
    console.log(points)
    console.log(points_82)
    min_82 = min / 82
    console.log(min)
    console.log(min_82)
    fga_82 = fga / 82
    fgm_82 = fgm / 82
    fgp_82 = fgp / 82
    fg3a_82 = fg3a / 82
    fg3m_82 = fg3m / 82
    fg3_pct_82 = fg3_pct / 82
    fta_82 = fta / 82
    ftm_82 = ftm / 82
    ftp_82 = ftp / 82
    totreb_82 = totreb / 82
    assists_82 = assists / 82
    steals_82 = steals / 82
    turnovers_82 = turnovers / 82
    blocks_82 = blocks / 82
    plusminus_82 = plusminus / 82
    pfouls_82 = pfouls / 82

    points = points / gameCount
    min = min / gameCount
    fga = fga / gameCount
    fgm = fgm / gameCount
    fgp = fgp / gameCount
    fg3a = fg3a / gameCount
    fg3m = fg3m / gameCount
    fg3_pct = fg3_pct / gameCount
    fta = fta / gameCount
    ftm = ftm / gameCount
    ftp = ftp / gameCount
    totreb = totreb / gameCount
    assists = assists / gameCount
    steals = steals / gameCount
    turnovers = turnovers / gameCount
    blocks = blocks / gameCount
    plusminus = plusminus / gameCount
    pfouls = pfouls / gameCount

    let averagesObject = {
        points:points,
        min:min,
        fga:fga,
        fgm:fgm,
        fgp:fgp,
        fta:fta,
        ftm:ftm,
        ftp:ftp,
        fg3_pct:fg3_pct,
        fg3a:fg3a,
        fg3m:fg3m,
        totreb:totreb,
        assists:assists,
        steals:steals,
        turnovers:turnovers,
        blocks:blocks,
        plusminus:plusminus,
        pfouls:pfouls
    }

    let averagesObject_82 = {
        points:points_82,
        min:min_82,
        fga:fga_82,
        fgm:fgm_82,
        fgp:fgp_82,
        fta:fta_82,
        ftm:ftm_82,
        ftp:ftp_82,
        fg3_pct:fg3_pct_82,
        fg3a:fg3a_82,
        fg3m:fg3m_82,
        totreb:totreb_82,
        assists:assists_82,
        steals:steals_82,
        turnovers:turnovers_82,
        blocks:blocks_82,
        plusminus:plusminus_82,
        pfouls:pfouls_82
    }

    return [averagesObject, averagesObject_82];
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
    } else {
        nameRow = boxTraditionalSeasonAverageTableVisitor.insertRow(0);
        headerRow = boxTraditionalSeasonAverageTableVisitor.insertRow(1);
        statRow = boxTraditionalSeasonAverageTableVisitor.insertRow(2);
        separationRow = boxTraditionalSeasonAverageTableVisitor.insertRow(3);
        nameRow_82 = boxTraditionalSeasonAverageTable_82Visitor.insertRow(0);
        headerRow_82 = boxTraditionalSeasonAverageTable_82Visitor.insertRow(1);
        statRow_82 = boxTraditionalSeasonAverageTable_82Visitor.insertRow(2);
        separationRow_82 = boxTraditionalSeasonAverageTableVisitor.insertRow(3);
    }


    for (let i = 0; i < Object.keys(objArray[0]).length; i++) {
        let cell0 = nameRow.insertCell(i)
        let cell1 = headerRow.insertCell(i)
        let cell2 = statRow.insertCell(i)
        cell0.innerHTML = player_name
        cell1.innerHTML = Object.keys(objArray[0])[i]
        cell2.innerHTML = Object.values(objArray[0])[i]
        let cell4 = nameRow_82.insertCell(i)
        let cell5 = headerRow_82.insertCell(i)
        let cell6 = statRow_82.insertCell(i)
        
        cell4.innerHTML = player_name
        cell5.innerHTML = Object.keys(objArray[1])[i]
        cell6.innerHTML = Object.values(objArray[1])[i]
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

const getPP240Expected = async() => {
    let teams = await getJsonResponseJackarithm('/teamnames');
    console.log(teams);
    let season = '2017-2018';
    for (let x = 0; x < teams.length; x++) {
        let teamId = await getJsonResponse(`/teamid/${teams[x].team_name}`)
        console.log(teamId);
        let totalMinutes = 0;
        let totalMinutes_82 = 0;
        let totalPoints = 0;
        let totalPoints_82 = 0;
        let roster = await getJsonResponseJackarithm(`/getroster/${season}/${teamId[0].team_id}`);
        console.log(roster);
        for (let i = 0; i < roster.length; i++) {
            let playerStats = await getPlayerSeasonOffensiveStatAveragesTraditional(season, roster[i].player_id);
            console.log(playerStats)
            totalMinutes += playerStats[0].min;
            //total of minutes per 82 games of every player on roster
            totalMinutes_82 += playerStats[1].min;
            totalPoints += playerStats[0].points;
            totalPoints_82 += playerStats[1].points;
        }
        let ratio_82 = totalPoints_82 / totalMinutes_82;
        console.log(totalMinutes)
        console.log(totalPoints)
        console.log(totalMinutes_82)
        console.log(totalPoints_82)

        let pointsPer240Expected = ratio_82 * 240;
        console.log(pointsPer240Expected);
        console.log(teams[x].team_name)
        let results = await appendExpectedPoints(teams[x].team_name, pointsPer240Expected);
    }
}




teamsDropDown();
//getRoster("2021-2022", "1610612744");
