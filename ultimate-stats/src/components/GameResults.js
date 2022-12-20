import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";
import ShotChartSVG from "./ShotChartSVG";
import ShotChartGameSVG from "./ShotChartGameSVG";
import ExpectedResults from "./ExpectedResults";

const GameResults = ({ selectedGameRange, setSelectedGameRange, expectedResults, setExpectedResults, gameResults, setGameResults, selectedSeason, setSelectedSeason }) => {
    

    useEffect(() => {
        const getGameResults = async() => {
            let results = await axios.get(`/leagueGames/withboxscoresummary/${selectedSeason}`)
            console.log(results.data.length);
            let data = results.data.slice(0, 2)
            setGameResults(data);
        }
        if (selectedSeason) {
            getGameResults();
        }
    }, [selectedSeason, setGameResults])

    return (
        <div>
            {gameResults.map((game, index) => (
                <h6 key={index}>{game.matchup} {<ExpectedResults game={game} index={index} expectedResults={expectedResults} setExpectedResults={setExpectedResults} gameResults={gameResults} setGameResults={setGameResults} selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason}/>}</h6>
            ))}
        </div>
    )
}

export default GameResults;