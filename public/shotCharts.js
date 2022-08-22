// Set Dimensions
const xSize = 500; 
const ySize = 470;
const margin = 40;
const xMax = xSize - margin*2;
const yMax = ySize - margin*2;

const letsGo = async() => {
    const data = [];
    let season = {"season":"2015-2016"};
    let totalShotsArray = await getJsonResponse(`/shots/${season['season']}`);
    for (let i = 0; i < totalShotsArray; i++) {
      data.push(totalShotsArray[i]);
    }

    // Append SVG Object to the Page
    const svg = d3.select("#myPlot")
      .append("svg")
      .append("g")
      .attr("transform","translate(" + margin + "," + margin + ")");

    // X Axis
    const x = d3.scaleLinear()
      .domain([0, 500])
      .range([0, xMax]);

    svg.append("g")
      .attr("transform", "translate(0," + yMax + ")")
      .call(d3.axisBottom(x));

    // Y Axis
    const y = d3.scaleLinear()
      .domain([0, 470])
      .range([ yMax, 0]);

    svg.append("g")
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
letsGo();