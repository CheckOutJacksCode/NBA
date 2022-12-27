import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";
import ShotChartSVG from "./ShotChartSVG";
import ShotChartGameSVG from "./ShotChartGameSVG";
import ExpectedResults from "./ExpectedResults";

const GameResults = ({ homeExpectedResults, 
                       setHomeExpectedResults, 
                       visitorExpectedResults, 
                       setVisitorExpectedResults, 
                       gameResults, 
                       setGameResults, 
                       selectedSeason, 
                       setSelectedSeason }) => {
    

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
                <div className="columnOdds" key={index}>{<ExpectedResults homeExpectedResults={homeExpectedResults} 
                                                                          setHomeExpectedResults={setHomeExpectedResults} 
                                                                          visitorExpectedResults={visitorExpectedResults} 
                                                                          setVisitorExpectedResults={setVisitorExpectedResults} 
                                                                          game={game} 
                                                                          selectedSeason={selectedSeason} 
                                                                          setSelectedSeason={setSelectedSeason} 
                                                                        />}</div>
            ))}
        </div>
    )
}

export default GameResults;