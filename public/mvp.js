/*CREATE MVP STAT
CREATE GNARLIEST DUDE
CREATE THE 'RON ARTEST' FACTOR

MVP*************************************

let totalWeightPoints = 0;
points      totReb      assists      steal/turnover    fgp     plus/minus      tpp      
  15           7           6              15            15         40           2

***************************************/

//JACKstat = .15(ppg) + .07(totReb) + .06(assists) + .15(steal/turnover) + .4(plus/minus**2) + .02(fgp)


const getMVPpoints = async(year, playerId) => {
    const gameDetailsArray = getPlayerStandardGameDetails(year, playerId);
    let ppg = await getSeasonStatAvg('ppg', year, playerId);
    let totReb = await getSeasonStatAvg('totReb', year, playerId);
    let assists = await getSeasonStatAvg('assists', year, playerId);
    let stealsTurnovers = (await getSeasonStatAvg('steals', year, playerId) - await getSeasonStatAvg('turnovers', year, playerId));
    let plusMinus = await getSeasonStatAvg('plusMinus', year, playerId);
    let fgp = await getSeasonStatAvg('fgp', year, playerId);
    let mvpPoints = (.15 * ppg) + (.07 * totReb) + (.06 * assists) + (.15 * stealsTurnovers) + (.4 * plusMinus) + (.02 * fgp);
    console.log(mvpPoints);
    return mvpPoints;
}