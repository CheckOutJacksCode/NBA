import React, { useEffect, useState } from "react";
import '../App.css';


const UserCapSpace = ({ roster, teamSalary, setTeamSalary, deletePlayer }) => {

    return (
        <div className="teamSalary">
            <span>Current Salary:</span>
            <br></br>
            {"$" + teamSalary}
        </div>
    )
}

export default UserCapSpace;