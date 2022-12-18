import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";
import ShotChartSVG from "./ShotChartSVG";
import ShotChartGameSVG from "./ShotChartGameSVG";
import GetRosterFromPreviousGame from "./GetRosterFromPreviousGame";
import ExpectedResults from "./ExpectedResults";

const ExpectedFromRoster = ({ gameId, previousSeason, selectedSeason, playerId, H_or_V, teamId }) => {
    
    const [playerAverages, setPlayerAverages] = useState([]);

    useEffect(() => {
        const getStats = async() => {
            let results;
            if (gameId !== '1') {
                results = await axios.get(`/boxScoresTraditional/averages/82games/${gameId}/${playerId}/${selectedSeason}/${H_or_V}`)
                if (results.data.length > 0) {
                    setPlayerAverages(results.data);
                } else {
                    results = await axios.get(`/boxScoresTraditional/averages/82games/${playerId}/${previousSeason}/${H_or_V}`)
                    setPlayerAverages(results.data);
                }
            } else {
                results = await axios.get(`/boxScoresTraditional/averages/82games/${playerId}/${previousSeason}/${H_or_V}`)
                setPlayerAverages(results.data);
            }

        }
        if (playerId) {
            getStats();
        }
    }, [playerId])

    return (
        <div>
            {playerAverages.length > 0 ? playerAverages[0].map((stat, index) => (
                <h6 key={index}>{Object.keys(stat) + ': ' + Object.values(stat)}</h6>
            )) : 'loading'}
        </div>
    )
}

export default ExpectedFromRoster;