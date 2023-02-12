import '../App.css';
import React, { useEffect, useState } from "react";
import hoop from "../apis/hoop";


const TeamsDropdown = ({teamsData, setTeamsData, selectedTeam, setSelectedTeam, H_or_V}) => {


    useEffect(() => {
        let isSubscribed = true;
        const getTeams = async() => {
            let teams = await hoop.get(`/api/teamnames`);
            setTeamsData(teams.data);
        } 
        getTeams();   
        return () => isSubscribed = false;
    }, [])

    function handleTeamChange(event) {
        setSelectedTeam(event.target.value);
        console.log(selectedTeam)
    }

    return (
        <div>
        <select value={selectedTeam} onChange={handleTeamChange}>
          <option value="0">Select {H_or_V}</option>

          {teamsData.map((option, index) => (
            <option key={index} value={Object.values(option)}>{Object.values(option)}</option>
          ))}
          
        </select>
        </div>
    );
        
};
        
export default TeamsDropdown;