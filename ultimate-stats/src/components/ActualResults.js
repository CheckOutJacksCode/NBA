import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";
import ShotChartSVG from "./ShotChartSVG";
import ShotChartGameSVG from "./ShotChartGameSVG";
import GetRosterFromPreviousGame from "./GetRosterFromPreviousGame";
import ExpectedResults from "./ExpectedResults";

const ActualResults = ({ game, H_or_V }) => {

    const [actual, setActual] = useState(0);


    useEffect(() => {
        const getResults = async() => {
            if (H_or_V === 'home') {
                setActual(parseFloat(game.pts).toFixed(0))
            } else {
                setActual((parseFloat(game.pts) - parseFloat(game.plus_minus)).toFixed(0))
            }
        }
        if (game) {
            getResults();
        }
    }, [game, H_or_V])

    return (
        <div>
            {actual}
        </div>
    )
}

export default ActualResults;