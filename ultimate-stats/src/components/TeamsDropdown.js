import axios from "axios";
import '../App.css';
import React, { useEffect, useState } from "react";

const TeamsDropdown = (props) => {


    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const getTeams = async() => {
            let teams = await axios.get(`/teamnames`);
            setTeams(teams.data);
        } 
        getTeams();   
    }, [])

        

    return (
        <div>
            <select className='form-control'>
                <option value="0">Select Team</option>
            {
                teams &&
                teams !== undefined ?
                teams.map((team, index) => {
                    return (
                        <option key={index} value={team.team_id}>{team.team_name}</option>
                    )
                })
                : 'No Team'
            }
            </select>
        </div>
    );
        
};
        
export default TeamsDropdown;