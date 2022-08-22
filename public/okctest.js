const fs = require("fs");
const { parse } = require("csv-parse");

const data = [];
fs.createReadStream("./shots_data.csv")
    .pipe(
      parse({
        delimiter: ",",
        columns: true,
        ltrim: true,
      })
    )
    .on("data", function (row) {
      // 👇 push the object row into the array
      data.push(row);
    })
    .on("error", function (error) {
      console.log(error.message);
    })
    .on("end", function () {
    // 👇 log the result array
    console.log("parsed csv data:");
    console.log(data);
    let twoPtCountA = 0;
    let threePtCountA = 0;
    let cornerThreeCountA = 0;
    let twoPtCountB = 0;
    let threePtCountB = 0;
    let cornerThreeCountB = 0;
    let totalA = 0;
    let totalB = 0;
    let twoPtMadeA = 0;
    let threePtMadeA = 0;
    let cornerMadeA = 0;
    let twoPtMadeB = 0;
    let threePtMadeB = 0;
    let cornerMadeB = 0;
    console.log(data.length);
    let count = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].y < 0) {
            count += 1;
        }
        if (data[i].team === 'Team A') { 
            totalA += 1; 
            if (parseFloat(data[i].x) >= -22 && parseFloat(data[i].x) <= 22) {
                if (23.75**2 - parseFloat(data[i].x)**2 >= parseFloat(data[i].y)**2) {
                    twoPtCountA += 1;
                    if (data[i].fgmade === '1') {
                        twoPtMadeA += 1;
                    }
                }
            }
            if (parseFloat(data[i].y) > 7.8) {
                if (parseFloat(data[i].x) + parseFloat(data[i].y) > 23.75) {
                    threePtCountA += 1;
                    if (data[i].fgmade === '1') {
                        threePtMadeA += 1;
                    }
                }
            }
            if (parseFloat(data[i].x) < -22 || parseFloat(data[i].x) > 22 ) {
                if (parseFloat(data[i].y) <= 7.8) {
                    cornerThreeCountA += 1;
                    if (data[i].fgmade === '1') {
                        cornerMadeA += 1;
                    }
                }
            }
        }
        else {
            totalB += 1;
            if (parseFloat(data[i].x) >= -22 && parseFloat(data[i].x) <= 22) {
                if (23.75**2 - parseFloat(data[i].x)**2 >= parseFloat(data[i].y)**2) {
                    twoPtCountB += 1;
                    if (data[i].fgmade === '1') {
                        twoPtMadeB += 1;
                    }
                }
            }
            if (parseFloat(data[i].y) > 7.8) {
                if (parseFloat(data[i].x) + parseFloat(data[i].y) > 23.75) {
                    threePtCountB += 1;
                    if (data[i].fgmade === '1') {
                        threePtMadeB += 1;
                    }
                }
            }
            if (parseFloat(data[i].x) < -22 || parseFloat(data[i].x) > 22 ) {
                if (parseFloat(data[i].y) <= 7.8) {
                    cornerThreeCountB += 1;
                    if (data[i].fgmade === '1') {
                        cornerMadeB += 1;
                    }
                }
            }
        }
    }
    console.log('team A')
    console.log(twoPtCountA);
    console.log(threePtCountA);
    console.log(cornerThreeCountA);
    console.log(twoPtCountA + threePtCountA + cornerThreeCountA);
    console.log(`total shots taken team A: ${totalA}`)
    console.log('team B:')
    console.log(twoPtCountB);
    console.log(threePtCountB);
    console.log(cornerThreeCountB);
    console.log(twoPtCountB + threePtCountB + cornerThreeCountB);
    console.log(`total shots taken team B: ${totalB}`)
    console.log('team A')
    console.log(twoPtMadeA)
    console.log(threePtMadeA)
    console.log(cornerMadeA)
    console.log('team B')
    console.log(twoPtMadeB)
    console.log(threePtMadeB)
    console.log(cornerMadeB)

    console.log(count)

  });
