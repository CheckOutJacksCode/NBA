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
//    let season = {"season":"2015-2016"};
    console.log(url);

    let totalShotsArray = await getJsonResponse(url);
    console.log(totalShotsArray);
    /*console.log(totalShotsArray.resultSets[0].rowSet);
    console.log([totalShotsArray.resultSets[0].rowSet[0]])
    console.log(totalShotsArray.resultSets.length)
    let length = totalShotsArray.resultSets[0].rowSet[0].length*/
    for (let i = 0; i < totalShotsArray.length; i++) {
      //data.push([totalShotsArray.resultSets[0].rowSet[i][17], totalShotsArray.resultSets[0].rowSet[i][18]]);
      data.push([totalShotsArray[i].loc_x, totalShotsArray[i].loc_y]);
    }

    // Append SVG Object to the Page
    const svg = d3.select("#myPlot")
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

    // Y Axis
    const y = d3.scaleLinear()
      .domain([0, height])
      .range([ 0, height]);

    svg.append("g")
      .attr("transform", "translate(250, 0)")
      .call(d3.axisLeft(y));

    // Dots
    svg.append('g')
      .selectAll("dot")
      .data(data).enter()
      .append("circle")
      .attr("cx", function (d) { return d[0] } )
      .attr("cy", function (d) { return d[1] } )
      .attr("r", 3)
      .style("fill", "Red");
}

const getGameIdGameDateMatchupBySeason = async(player, season) => {
  console.log(player);
  console.log(season);
  let matchupArray = await getJsonResponse(`/local/gameidgamedatematchup/${player}/${season}`);
  return matchupArray;
}

let gameIdArray = [];
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
  console.log('here');
  await gameDropDown();
  document.getElementById("f1").style.display = "block";
}

console.log(shotsGameId.value);
console.log(shotsPlayer.value);
console.log(shotsSeason).value;
