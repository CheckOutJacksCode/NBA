const shotsPlayer = document.getElementById("shots_player");
const shotsSeason = document.getElementById("shots_season");
const shotsGameId = document.getElementById("shots_gameId");
const submitShots = document.getElementById("submit_shots");

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

var item = "";
var str = "";
  for (var game of games) {
    str += "<option>" + game + "</option>"
  }
  document.getElementById("pickone").innerHTML = str;
}


const letsGo = async(url) => {
    const data = [];
    let season = {"season":"2015-2016"};
    let totalShotsArray = await getJsonResponse(url);
    console.log(totalShotsArray.resultSets[0].rowSet);
    console.log([totalShotsArray.resultSets[0].rowSet[0]])
    console.log(totalShotsArray.resultSets.length)
    let length = totalShotsArray.resultSets[0].rowSet[0].length
    for (let i = 0; i < length; i++) {
      data.push([totalShotsArray.resultSets[0].rowSet[i][17], totalShotsArray.resultSets[0].rowSet[i][18]]);
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

let url = `/local/shots/${shotsPlayer}/${shotsSeason}/${shotsGameId}`
submitShots.onclick = async() => {
  letsGo(url);
}

