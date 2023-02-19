import React, { useEffect, useState } from "react";
import '../App.css';

import hoop from "../apis/hoop";

const TeamName = ({ submitFlag, setSubmitFlag, teamName, setTeamName }) => {

    useEffect(() => {
      const getUsers = async() => {
        let results = await hoop.get('/api/users/fakedb')
        console.log(results.data);
      }
      getUsers();
    }, [])
    function handleChange(e) {
        setTeamName({ value: e.target.value });
    }

    function handleSubmit(e) {
        setSubmitFlag(true);
    }

    return (
        <>
          {submitFlag ? '' : 
            <>
              <div className="teamNameLabel">Enter Team Name:</div>
              <input type="text" value={teamName.value} onChange={handleChange} maxLength="50"/>
              <input type="submit" value="Submit" onClick={handleSubmit} />
            </>
          }
          <h4 className="teamName">
            {teamName.value ? teamName.value : ''}
          </h4>
        </>
      );
}

export default TeamName;