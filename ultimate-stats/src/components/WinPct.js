import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";
import hoop from "../apis/hoop";


const WinPct = ({ selectedSeason }) => {

    const [winPct, setWinPct] = useState(0);

    useEffect(() => {

        const getWinPct = async() => {
            let results = await hoop.get(`/api/gambling/winPct/${selectedSeason}`);
            let pct = (parseFloat(results.data[1].count) / (parseFloat(results.data[1].count) + parseFloat(results.data[0].count))) * 100;
            setWinPct(pct.toFixed(2));
        }
        getWinPct();
    }, [selectedSeason])

    return (
        <div className="winPct">
            {selectedSeason}
            <br></br>
            Win Pct
            <br>
            </br>
            {winPct}%
        </div>
    )
}

export default WinPct;