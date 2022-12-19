import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";
import ShotChartSVG from "./ShotChartSVG";
import ShotChartGameSVG from "./ShotChartGameSVG";
import ExpectedResults from "./ExpectedResults";
import ExpectedFromRoster from "./ExpectedFromRoster";

const GetRosterFromPreviousGame = ({ game, previousGameId, roster, setRoster, teamId, setTeamId, gameDate, setGameDate, selectedSeason, setSelectedSeason, H_or_V, setH_or_V}) => {
    
    let [totalMins, setTotalMins] = useState(0);
    let [totalStat, setTotalStat] = useState(0);


    useEffect(() => {
        const getExpectedTotals = async() => {
            let results1 = await axios.get(`boxScoresTraditional/sumstat/${selectedSeason}/${teamId}/${previousGameId}/min`)
            if (results1.data.length > 0) {
                setTotalMins(results1.data[0].sum)
            }
            let results2 = await axios.get(`boxScoresTraditional/sumstat/${selectedSeason}/${teamId}/${previousGameId}/plus_minus`)
            if (results2.data.length > 0) {
                setTotalStat(results2.data[0].sum)
            }
        }
        if (previousGameId) {
            getExpectedTotals();
        }
    }, [previousGameId])

    const [previousSeason, setPreviousSeason] = useState('');
/*    const [totalStat, setTotalStat] = useState(0);
    const [totalMins, setTotalMins] = useState(0);
    const [expected, setExpected] = useState(0);*/


    /*useEffect(() => {
        const setTotalMinsP240 = async() => {
            let mins = totalMins + parseFloat(playerAverages[0].min)
            setTotalMins(mins);
        }
        if (playerAverages.length > 0) {
            setTotalMinsP240();
        }
    }, [playerAverages, totalMins])

    useEffect(() => {
        const setTotalStatP240 = async() => {
            let stat = totalStat + parseFloat(playerAverages[0]["+/-"]);
            setTotalStat(stat);
        }
        if (playerAverages.length > 0) {
            setTotalStatP240();
        }
    }, [playerAverages, totalStat])

    useEffect(() => {
        const setExpectedP240 = async() => {
            let expectedP240 = totalStat / totalMins * 240;
            setExpected(expectedP240);
        }
        if (playerAverages.length > 0) {
            setExpectedP240();
        }
    }, [totalMins, playerAverages.length, totalStat])*/

    useEffect(() => {
        const getPreviousSeason = async() => {
            let split = selectedSeason.split('-')
            let previous = parseInt(split[1]) - 1;
            let previous2 = parseInt(split[0]) - 1;
            let thisSeason = previous2 + '-' + previous;
            setPreviousSeason(thisSeason);
        }
        if (selectedSeason) {
            getPreviousSeason();
        }
    }, [selectedSeason])


    useEffect(() => {
        const getRoster = async() => {

            if (previousGameId === '1') {
           
                let results = await axios.get(`/boxPlayers/getroster/${selectedSeason}/${teamId}`)
                let data = results.data;
                setRoster(data);
            } else {
                let results = await axios.get(`/boxPlayers/previousgame/gameid/${selectedSeason}/${teamId}/${previousGameId}`);
                let data = results.data;
                setRoster(data);
            }
        }
        if (game) {
            getRoster();
        }
    }, [game, previousGameId, selectedSeason, setRoster, teamId])
    

    return (
        <div>
            {roster.map((player, index) => (
                <h6 key={index}>{player.player_name}
                {<ExpectedFromRoster totalMins={totalMins} setTotalMins={setTotalMins} totalStat={totalStat} setTotalStat={setTotalStat} gameId={previousGameId} previousSeason={previousSeason} selectedSeason={selectedSeason} playerId={player.player_id} H_or_V={H_or_V} teamId={teamId} />}
                <br></br>
                {totalStat && totalMins > 0 ? (totalStat / totalMins * 240) : 'loading'}
                <br></br>
                {totalMins}
                <br></br>
                {totalStat}
                <br></br>
                
                </h6>
            ))}
            {totalStat && totalMins > 0 ? (totalStat / totalMins * 240) : 'loading'}

        </div>
    )
}

export default GetRosterFromPreviousGame;