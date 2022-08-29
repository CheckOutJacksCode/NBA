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
    //HERES WHERE YOU FIX THE 'KEVIN DURANT DIDNT PLAY THAT SEASON SO THE GAMES CHART APPEARS' BUG
    if (totalShotsArray.length > 40) {
      myPlot = "myPlot";
      chartTitle = "SEASON SHOT CHART";
    } else {
      myPlot = "myPlot2";
      chartTitle = "GAME SHOT CHART";
    }
    // Append SVG Object to the Page
    const svg = d3.select(`#${myPlot}`)
      .append("svg")
      .append("g")
      .attr("transform","translate(" + halfPosWidth + ", " + yMargin + ")");
    
    
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

    svg.append("line")
      .attr("x1", 60)
      .attr("x2", 60)
      .attr("y1", 0)
      .attr("y2", 137.5)
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
    
    const arc = svg.append("path")
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
    if (game.game_date + ' ' + game.matchup === shotsGameId.value) {
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

