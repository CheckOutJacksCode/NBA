import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";
import ShotChartSVG from "./ShotChartSVG";
import ShotChartGameSVG from "./ShotChartGameSVG";
import ExpectedResults from "./ExpectedResults";
import hoop from "../apis/hoop";


const HistoricalResults = ({selectedSeason, setSelectedSeason}) => {

    const [historicalResults, setHistoricalResults] = useState([]);

    useEffect(() => {

        const getHistoricalResults = async() => {

            let results = await hoop.get(`/api/gambling/historicalResults/${selectedSeason}`);
            console.log(results.data);
            setHistoricalResults(results.data);
        }
        if (selectedSeason) {
            getHistoricalResults();
        }
    }, [selectedSeason])

    return (
        <div>
            {historicalResults.map((game, index) => (
                
                game.green_red === 'green' ? 
                <div className="historicalGreen" key={index}>
                    <p>{game.game_date}</p>
                    <p className="column25predictions">
                        H vs. V
                        <br></br>
                        {game.matchup.substring(0,3)}
                        <br></br>
                        {game.matchup.substring(8,11)}
                    </p>
                    <p className="column25predictions">
                        Exp.
                        <br></br>
                        {game.home_expected}
                        <br></br>
                        {game.visitor_expected}
                    </p>
                    <p className="column25predictions">
                        Act.
                        <br></br>
                        {game.home_actual}
                        <br></br>
                        {game.visitor_actual}
                    </p>
                    <p className="column25predictions">
                        Odds
                        <br></br>
                        {game.home_odds}
                        <br></br>
                        {game.visitor_odds}
                    </p>
                </div>
                :
                <div className="historicalRed" key={index}>
                    <p>{game.game_date}</p>
                    <p className="column25">
                        H vs. V
                        <br></br>
                        {game.matchup.substring(0,3)}
                        <br></br>
                        {game.matchup.substring(8,11)}
                    </p>
                    <p className="column25">
                        Exp.
                        <br></br>
                        {game.home_expected}
                        <br></br>
                        {game.visitor_expected}
                    </p>
                    <p className="column25">
                        Act.
                        <br></br>
                        {game.home_actual}
                        <br></br>
                        {game.visitor_actual}
                    </p>
                    <p className="column25">
                        Odds
                        <br></br>
                        {game.home_odds}
                        <br></br>
                        {game.visitor_odds}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default HistoricalResults;