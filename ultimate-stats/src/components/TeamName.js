import React, { useEffect, useState } from "react";
import '../App.css';
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import Price from "./Price";

const TeamName = ({ submitFlag, setSubmitFlag, teamName, setTeamName }) => {

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
              <label>
                Team Name:
                <input type="text" value={teamName.value} onChange={handleChange} maxLength="50"/>
              </label>
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