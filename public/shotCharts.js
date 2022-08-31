

const shotsPlayer = document.getElementById("shots_player");
const shotsSeason = document.getElementById("shots_season");
const shotsGameId = document.getElementById("shots_gameId");
//const submitShots = document.getElementById("submit_shots");


// Set Dimensions
const xSize = 600; 
const ySize = 570;
const xHalf = -350;
const xPosHalf = 350;
const xMargin = 100;
const yMargin = 50;
const width = xSize - xMargin
const height = ySize - yMargin
const halfWidth = xHalf + xMargin;
const halfPosWidth = xPosHalf - xMargin;


const letsGo = async(url) => {
    const data = [];
    const dataMadeShots = [];
    const dataMissedShots = [];
//    let season = {"season":"2015-2016"};
    console.log(url);
    console.log(data);
    let totalShotsArray = await getJsonResponse(url);
    console.log(totalShotsArray);
    /*console.log(totalShotsArray.resultSets[0].rowSet);
    console.log([totalShotsArray.resultSets[0].rowSet[0]])
    console.log(totalShotsArray.resultSets.length)
    let length = totalShotsArray.resultSets[0].rowSet[0].length*/
    for (let i = 0; i < totalShotsArray.length; i++) {
      //data.push([totalShotsArray.resultSets[0].rowSet[i][17], totalShotsArray.resultSets[0].rowSet[i][18]]);
      if (totalShotsArray[i].shot_made_flag === "1") {
        dataMadeShots.push([totalShotsArray[i].loc_x, totalShotsArray[i].loc_y])
      } else {
        dataMissedShots.push([totalShotsArray[i].loc_x, totalShotsArray[i].loc_y]);
      }
    }
    let myPlot;
    let playerId
    let year
    let points
    let min
    let fga
    let fgm
    let fgp
    let fta
    let ftm
    let ftp
    let tpp
    let tpa
    let tpm
    let totreb
    let assists
    let steals
    let turnovers
    let blocks
    let plusminus
    let league = "standard";
    //HERES WHERE YOU FIX THE 'KEVIN DURANT DIDNT PLAY THAT SEASON SO THE GAMES CHART APPEARS' BUG
    if (totalShotsArray.length > 40) {
      myPlot = "myPlot";
      chartTitle = "SEASON SHOT CHART";
      player_name = totalShotsArray[0].player_name;
      splitName = player_name.split(" ");
      let playerId = await getJsonResponse(`/local/players/playerid/${splitName[1]}/${splitName[0]}`);
      console.log(playerId);
      playerId = playerId[0].playerid;
      year = shotsSeason.value;
      points = await getSeasonStatAvgLocal('points', year, playerId)
      min = await getSeasonStatAvgLocal('min', year, playerId)
      fgp = await getSeasonStatAvgLocal('fgp', year, playerId)
      fga = await getSeasonStatAvgLocal('fga', year, playerId)
      fgm = await getSeasonStatAvgLocal('fgm', year, playerId)
      ftp = await getSeasonStatAvgLocal('ftp', year, playerId)
      fta = await getSeasonStatAvgLocal('fta', year, playerId);
      ftm = await getSeasonStatAvgLocal('ftm', year, playerId);
      tpp = await getSeasonStatAvgLocal('tpp', year, playerId)
      tpa = await getSeasonStatAvgLocal('tpa', year, playerId)
      tpm = await getSeasonStatAvgLocal('tpm', year, playerId)
      totreb = await getSeasonStatAvgLocal('totreb', year, playerId)
      assists = await getSeasonStatAvgLocal('assists', year, playerId)
      steals = await getSeasonStatAvgLocal('steals', year, playerId);
      turnovers = await getSeasonStatAvgLocal('turnovers', year, playerId);
      blocks = await getSeasonStatAvgLocal('blocks', year, playerId);
      plusminus = await getSeasonStatAvgLocal('plusminus', year, playerId);
      
    } else {
      myPlot = "myPlot2";
      chartTitle = "GAME SHOT CHART";
      player_name = totalShotsArray[0].player_name;
      splitName = player_name.split(" ");
      let playerId = await getJsonResponse(`/local/players/playerid/${splitName[1]}/${splitName[0]}`);
      let playerid = playerId[0].playerid.toString();
      let year = shotsSeason.value;
      let league = "standard";
     
      //let seasonyear = year.substring(0, 4);
      let shotsgameid = shotsGameId.value.substring(0, 10);
      //MAKE ENDPOINT TO GET ONE GAME
 
      let games = await getJsonResponse(`/games/${playerid}`)
      console.log(games);

      let gameid;
      let gameidArray = [];
      for (let i = 0; i < games.length; i++) {
        gameid = games[i].gameid;
        
        let gameinfo = await getJsonResponse(`/gameinfo/${gameid}`)
       
        if (gameinfo[0].vteam.shortName + ' vs. ' + gameinfo[0].hteam.shortName === shotsGameId.value.substring(11, 20) || gameinfo[0].vteam.shortName + ' @ ' + gameinfo[0].hteam.shortName === shotsGameId.value.substring(11, 20)) {
          let game_date = shotsGameId.value.substring(0, 10);
          console.log(gameinfo[0].starttimeutc.substring(0, 7))
          console.log(game_date.substring(0, 7))
          console.log(gameinfo[0].starttimeutc.substring(0, 7).length)
          console.log(game_date.substring(0, 7).length)
          //GET GAMEID WHERE VTEAM SHORTNAME HTEAM SHORTNAME === 
          if (gameinfo[0].starttimeutc.substring(0, 7) === game_date.substring(0, 7)) {
            console.log('kdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
            gameid = gameinfo[0].gameid;
            break;
            console.log(gameid);
          }
        
          gameidArray.push(gameid);
        }
      }
      console.log(gameidArray);
      
      

      //GET GAME
      /*let vteamhteam = await getJsonResponse(`/games/vteamhteam/${playerid}`);
      console.log(`/games/vteamhteam/${playerid}`);
      console.log(vteamhteam);
      for (let j = 0; j < vteamhteam.length; j++) {
        if (vteamhteam[j].vteam.shortName + ' vs. ' + vteamhteam[j].hteam.shortName === shotsGameId.value.substring(11, -1) || vteamhteam[j].vteam.shortName + ' @ ' + vteamhteam[j].hteam.shortName === shotsGameId.value.substring(11, -1)) {
          let game_date = shotsGameId.value.substring(0, 10);
          //GET GAMEID WHERE VTEAM SHORTNAME HTEAM SHORTNAME === 
          let gameid = await getJsonResponse(`/games/gameid/${playerid}/${league}/${year}/${shotsgameid}`);
        }
      }*/
      //await getJsonResponse(`/gameid/vshortname/hshortname`)
      console.log('KDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD')
      console.log(gameid);
      //CATCH THE ERROR HERE IF THE PLAYER DIDNT PLAY IN THE GAME
      let boxScore = await getJsonResponse(`/games/${gameid}/${playerid}`);
      console.log(boxScore);
      boxScore = boxScore[0];
      points = boxScore.points;
      min = boxScore.min;
      fga = boxScore.fga;
      fgm = boxScore.fgm;
      fgp = boxScore.fgp;

      tpa = boxScore.tpa;
      tpm = boxScore.tpm;
      tpp = boxScore.tpp;

      fta = boxScore.fta;
      ftm = boxScore.ftm;
      ftp = boxScore.ftp;

      totreb = boxScore.totreb;
      assists = boxScore.assists;
      steals = boxScore.steals;
      turnovers = boxScore.turnovers;
      blocks = boxScore.blocks;
      plusminus = boxScore.plusminus;
      pfouls = boxScore.pfouls;



    }
    //GET THE STATS YOU WANT IN A TEXT CHUNK
    //season fg% season 3pt% season eFG% ast, blk, stl, threes, 
    //game box score; 4-12, ast, blk, stl, three pt. 2-3, 


    // Append SVG Object to the Page
    const svg = d3.select(`#${myPlot}`)
      .append("svg")
      .append("g")
      .attr("transform","translate(" + halfPosWidth + ", " + yMargin + ")");
    
    d3.select(`#${myPlot}`).selectAll("text").remove()
      // X Axis
    const x = d3.scaleLinear()
      .domain([-250, 250])
      .range([0, width]);

    svg.append("g")
      .attr("transform", "translate(-250, 0)")
      .call(d3.axisBottom(x));

    svg.append("text")
      .attr("x", 0)
      .attr("y", -15)
      .text(`${chartTitle}`)
      .style("text-anchor", "middle")
      .style("font-size", "40px")
      .style('fill', 'chartreuse')
    
    svg.append("text")
      .attr("x", 0)
      .attr("y", -15)
      .text(`${chartTitle}`)
      .style("text-anchor", "middle")
      .style("font-size", "40px")
      .style('fill', 'chartreuse')
    
    
    svg.append("text")
      .attr("x", 260)
      .attr("y", 70)
      .text(`PPG: ${parseFloat(points).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')

    svg.append("text")
      .attr("x", 260)
      .attr("y", 90)
      .text(`MIN: ${parseFloat(min).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')

    svg.append("text")
      .attr("x", 260)
      .attr("y", 110)
      .text(`FGA: ${parseFloat(fga).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')

    svg.append("text")
      .attr("x", 260)
      .attr("y", 130)
      .text(`FGM: ${parseFloat(fgm).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')  

    svg.append("text")
      .attr("x", 260)
      .attr("y", 150)
      .text(`FGP: ${parseFloat(fgp).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')
      
    svg.append("text")
      .attr("x", 260)
      .attr("y", 170)
      .text(`FTA: ${parseFloat(fta).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')
    
    svg.append("text")
      .attr("x", 260)
      .attr("y", 190)
      .text(`FTM: ${parseFloat(ftm).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')    
    
    svg.append("text")
      .attr("x", 260)
      .attr("y", 210)
      .text(`FTP: ${parseFloat(ftp).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')
    
    svg.append("text")
      .attr("x", 260)
      .attr("y", 230)
      .text(`TPA: ${parseFloat(tpa).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')

    svg.append("text")
      .attr("x", 260)
      .attr("y", 250)
      .text(`TPM: ${parseFloat(tpm).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')

    svg.append("text")
      .attr("x", 260)
      .attr("y", 270)
      .text(`TPP: ${parseFloat(tpp).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')
    
    svg.append("text")
      .attr("x", 260)
      .attr("y", 290)
      .text(`REB: ${parseFloat(totreb).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')
    
    svg.append("text")
      .attr("x", 260)
      .attr("y", 310)
      .text(`AST: ${parseFloat(assists).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')
    
    svg.append("text")
      .attr("x", 260)
      .attr("y", 330)
      .text(`STL: ${parseFloat(steals).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')
    
    svg.append("text")
      .attr("x", 260)
      .attr("y", 350)
      .text(`TO: ${parseFloat(turnovers).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')
    
    svg.append("text")
      .attr("x", 260)
      .attr("y", 370)
      .text(`BLK: ${parseFloat(blocks).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')
    
    svg.append("text")
      .attr("x", 260)
      .attr("y", 390)
      .text(`P-M: ${parseFloat(plusminus).toFixed(1)}`)
      .style("text-anchor", "left")
      .style("font-size", "20px")
      .style('fill', 'chartreuse')
    
    svg.append("text")
      .attr("x", 0)
      .attr("y", -15)
      .text(`${chartTitle}`)
      .style("text-anchor", "middle")
      .style("font-size", "40px")
      .style('fill', 'chartreuse')

    svg.append("line")
      .attr("x1", 60)
      .attr("x2", 60)
      .attr("y1", 0)
      .attr("y2", 137.5)
      .attr("stroke", "white")
      .attr("stroke-width", "2")

    svg.append("line")
      .attr("x1", -250)
      .attr("x2", 250)
      .attr("y1", 470)
      .attr("y2", 470)
      .attr("stroke", "white")
      .attr("stroke-width", "2")

    svg.append("line")
      .attr("x1", -60)
      .attr("x2", -60)
      .attr("y1", 0)
      .attr("y2", 137.5)
      .attr("stroke", "white")
      .attr("stroke-width", "2")

    svg.append("line")
      .attr("x1", -80)
      .attr("x2", 80)
      .attr("y1", 137.5)
      .attr("y2", 137.5)
      .attr("stroke", "white")
      .attr("stroke-width", "2")

    svg.append("line")
      .attr("x1", -80)
      .attr("x2", -80)
      .attr("y1", 0)
      .attr("y2", 137.5)
      .attr("stroke", "white")
      .attr("stroke-width", "2")

    svg.append("line")
      .attr("x1", 80)
      .attr("x2", 80)
      .attr("y1", 0)
      .attr("y2", 137.5)
      .attr("stroke", "white")
      .attr("stroke-width", "2")

    svg.append("line")
      .attr("x1", -220)
      .attr("x2", -220)
      .attr("y1", 0)
      .attr("y2", 78)
      .attr("stroke", "white")
      .attr("stroke-width", "2")

    svg.append("line")
      .attr("x1", 220)
      .attr("x2", 220)
      .attr("y1", 0)
      .attr("y2", 78)
      .attr("stroke", "white")
      .attr("stroke-width", "2")

    // Y Axis
    const y = d3.scaleLinear()
      .domain([0, height])
      .range([ 0, height]);

    svg.append("g")
      .attr("transform", "translate(250, 0)")
      .call(d3.axisLeft(y));

    // Dots
    d3.select(`#${myPlot}`).selectAll("circle").remove()


    svg.append("circle")
      .attr("cx", 0)
      .attr("cy", 137.5)
      .attr("r", 60)
      .style("opacity", .2)
      .attr("stroke", "white")
      .style("fill", "#33FFEC");
    
    svg.append("circle")
      .attr("cx", 0)
      .attr("cy", 470)
      .attr("r", 60)
      .style("opacity", .1)
      .attr("stroke", "white")
      .style("fill", "#33FFEC");

    svg.append("circle")
      .attr("cx", 0)
      .attr("cy", 470)
      .attr("r", 20)
      .attr("stroke", "white")
      .style("fill", "none");

    const arcGenerator2 = d3.arc()
      .outerRadius(61)
      .innerRadius(59)
      .startAngle(0)
      .endAngle(2*Math.PI);
    
    const halfCourtCircle = svg.append("path")
      .attr("transform", "translate(0, 470)")
      .attr("fill","white")
      .attr("d", arcGenerator2());

    const freeThrowCircle = svg.append("path")
      .attr("transform", "translate(0, 137.5)")
      .attr("fill","white")
      .attr("d", arcGenerator2());
    
    /*svg.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 235)
      .attr("stroke", "white")
      .style("fill", "none");
*/
    const arcGenerator = d3.arc()
      .outerRadius(235)
      .innerRadius(233)
      .startAngle(Math.PI / 2 + 0.3407)
      .endAngle(Math.PI*3/2 - 0.3407);
    
    const threeLine = svg.append("path")
      .attr("transform", "translate(0, 0)")
      .attr("fill","white")
      .attr("d", arcGenerator());
    
    svg.append('g')
      .selectAll("dot")
      .data(dataMissedShots).enter()
      .append("circle")
      .attr("cx", function (d) { return d[0] } )
      .attr("cy", function (d) { return d[1] } )
      .attr("r", 3)
      .style("fill", "seagreen");

    svg.append('g')
      .selectAll("dot")
      .data(dataMadeShots).enter()
      .append("circle")
      .attr("cx", function (d) { return d[0] } )
      .attr("cy", function (d) { return d[1] } )
      .attr("r", 3)
      .style("fill", "yellow");
}


const getGameIdGameDateMatchupBySeason = async(player, season) => {
  console.log(player);
  console.log(season);
  let matchupArray = await getJsonResponse(`/local/gameidgamedatematchup/${player}/${season}`);
  return matchupArray;
}

let gameIdArray = [{ game_id: "dummyGame", game_date: "initializeArray", matchup: "dogs vs. cats" }];
const gameDropDown = async() => {

  let games = await getGameIdGameDateMatchupBySeason(document.getElementById("shots_player").value, document.getElementById("shots_season").value)
  var str = ""
    try {
      for (var game of games) {
        console.log(game);
        str += "<option>" + game.game_date + " " + game.matchup + "</option>";
        gameIdArray.push({ game_id: game.game_id, game_date: game.game_date, matchup: game.matchup })
      }
      document.getElementById("shots_gameId").innerHTML = str;
    } catch(error) {
      console.log(error);
    }
}


const submitShots = async() => {
  //FIND ONE IN NEW GAMEID ARRAY WHERE SHOTSGAMEID.VALUE === 
  
  for (var game of gameIdArray) {
    console.log(game.game_date + ' ' + game.matchup);
    console.log(shotsGameId.value);
    let shotsgameid = shotsGameId.value;
    if (game.game_date + ' ' + game.matchup === shotsgameid) {
      let url = `/local/shots/${shotsPlayer.value}/${shotsSeason.value}/${game.game_id}`
      await letsGo(url);
      break;
    }
  }
}

const showForm = async() => {
  await gameDropDown();
  let url = `/local/shots/${shotsPlayer.value}/${shotsSeason.value}`;
  await letsGo(url);
  document.getElementById("f1").style.display = "block";
}

