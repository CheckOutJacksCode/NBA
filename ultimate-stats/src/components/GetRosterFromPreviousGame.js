import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";
import ShotChartSVG from "./ShotChartSVG";
import ShotChartGameSVG from "./ShotChartGameSVG";
import ExpectedResults from "./ExpectedResults";
import ExpectedFromRoster from "./ExpectedFromRoster";

const GetRosterFromPreviousGame = ({ game, previousGameId, roster, setRoster, teamId, setTeamId, gameDate, setGameDate, selectedSeason, setSelectedSeason, H_or_V, setH_or_V}) => {
    
    const [previousSeason, setPreviousSeason] = useState('');

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
    }, [game])
    
    return (
        <div>
            {roster.map((player, index) => (
                <h6 key={index}>{player.player_name} {<ExpectedFromRoster gameId={previousGameId} previousSeason={previousSeason} selectedSeason={selectedSeason} playerId={player.player_id} H_or_V={H_or_V} teamId={teamId} />} </h6>
            ))}
        </div>
    )
}

export default GetRosterFromPreviousGame;