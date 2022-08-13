const seasonMvpPts = document.getElementById("seasonMvpPts");
const seasonMvpPointsTable = document.getElementById("seasonMvpPointsTable");

const quicksort = async(array, leftBound = 0, rightBound = array.length - 1) => {
    if (leftBound < rightBound) {
      const pivotIndex = await partition(array, leftBound, rightBound);
      quicksort(array, leftBound, pivotIndex - 1);
      quicksort(array, pivotIndex, rightBound);
    }
    return array;
  }
  
  const partition = async(array, leftIndex, rightIndex) => {
    const pivot = array[Math.floor((rightIndex + leftIndex) / 2)];
    while (leftIndex <= rightIndex) {
      while (array[leftIndex] < pivot) {
        leftIndex++;
      }
      while (array[rightIndex] > pivot) {
        rightIndex--;
      }
      if (leftIndex <= rightIndex) {
        swap(array, leftIndex, rightIndex);
        leftIndex++;
        rightIndex--;
      }
    }
    return leftIndex;
}

const swap = (arr, indexOne, indexTwo) => {
    const temp = arr[indexTwo];
    arr[indexTwo] = arr[indexOne];
    arr[indexOne] = temp;
}
  
const mvpLoadUp = async() => {
    let playerIdArray = await getArrayOfPlayerIdsInEastandWestConferences();
    let mvpPlayersArray = [];
    for (let i = 0; i < playerIdArray.length; i++) {
        console.log(seasonMvpPts.value)
        let playerArray = [];
        let mvpPoints = await getMvpPoints(seasonMvpPts.value, playerIdArray[i]);
        let player = await getIndividualPlayerLocal(playerIdArray[i]);
        playerArray = [mvpPoints, player];
        mvpPlayersArray.push(playerArray);
    }
    let sortedArray = await quicksort(mvpPlayersArray)
    console.log(sortedArray);
    for (let j = 0; j < sortedArray.length; j++) {
        await appendPlayerAndStatMVPTable(sortedArray[i][1], 'MVP Points', sortedArray[i][0]);
    }
}
  
  
  /* Appends any players' stat to the html table. Can take both regular stats and deep stats. */
rowIndex = 1;
const appendPlayerAndStatMVPTable = async(player, stat, statAverage) => {
    let row = seasonMvpPointsTable.insertRow(rowIndex);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = player[0].firstname + ' ' + player[0].lastname;
    if (isNaN(statAverage)) {
        cell2.innerHTML = 'Statistics Unavailable'
    } else {
        cell2.innerHTML = stat + ":" + ` ${statAverage}`;
    }
    rowIndex += 1;
}
const deepGo = async() => {
    await mvpLoadUp();
}
deepGo();