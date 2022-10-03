const rosterTable = document.getElementById("seasonTeamRosterTable");
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
        plusminus:plusminus
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
        plusminus:plusminus_82
    }

    return [averagesObject, averagesObject_82];
}

const getStatsFromBoxTraditional = async(season, playerid) => {
    let stats = await getJsonResponseJackarithm(`/jackarithm/boxscorestraditional/${playerid}/${season}`);
    return stats;
}

rosterRowIndex = 0;
const appendPlayerRosterTable = async(playerid, player) => {
    let row = seasonTeamRosterTable.insertRow(rosterRowIndex);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = player;
    cell2.innerHTML = playerid;
    rosterRowIndex += 1;
    return 'appended';
}


const appendPlayerBoxTraditionalSeasonAverageTable = async(objArray, player_name) => {
    let nameRow = boxTraditionalSeasonAverageTable.insertRow(0);
    let headerRow = boxTraditionalSeasonAverageTable.insertRow(1);
    let statRow = boxTraditionalSeasonAverageTable.insertRow(2);
    let separationRow = boxTraditionalSeasonAverageTable.insertRow(3);
    let nameRow_82 = boxTraditionalSeasonAverageTable_82.insertRow(0);
    let headerRow_82 = boxTraditionalSeasonAverageTable_82.insertRow(1);
    let statRow_82 = boxTraditionalSeasonAverageTable_82.insertRow(2);
    let separationRow_82 = boxTraditionalSeasonAverageTable.insertRow(3);


    for (let i = 0; i < Object.keys(objArray[0]).length; i++) {
        let cell0 = nameRow.insertCell(i)
        let cell1 = headerRow.insertCell(i)
        let cell2 = statRow.insertCell(i)
        let cell3 = separationRow.insertCell(i)
        cell0.innerHTML = player_name
        cell1.innerHTML = Object.keys(objArray[0])[i]
        cell2.innerHTML = Object.values(objArray[0])[i]
        cell3.innerHTML = '-'
        let cell4 = nameRow_82.insertCell(i)
        let cell5 = headerRow_82.insertCell(i)
        let cell6 = statRow_82.insertCell(i)

        cell4.innerHTML = player_name
        cell5.innerHTML = Object.keys(objArray[1])[i]
        cell6.innerHTML = Object.values(objArray[1])[i]
    }
    return 'appended';
}
const gameDropDown = async() => {

    let games = await getGameIdGameDateMatchupBySeason(shotsPlayer.value, shotsSeason.value);
    var str = '<option value="none" selected disabled hidden>Select an Option</option>';
    document.getElementById("shots_gameId").innerHTML = str;
      try {
        for (var game of games) {
          str += "<option>" + game.game_date + " " + game.matchup + "</option>";
          gameIdArray.push({ game_id: game.game_id, game_date: game.game_date, matchup: game.matchup })
        }
        document.getElementById("shots_gameId").innerHTML = str;
      } catch(error) {
        console.log(error);
      }
  }
getRoster("2021-2022", "1610612744");
