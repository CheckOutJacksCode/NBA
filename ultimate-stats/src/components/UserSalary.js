import React, { useEffect, useState } from "react";
import '../App.css';


const UserSalary = ({ roster, teamSalary, setTeamSalary, deletePlayer }) => {

    return (
        <div className="teamSalary">
            Current roster salary:<span style={{color: "rgb(26,255,0)", fontSize: "large"}}>{" $" + teamSalary}</span>
        </div>
    )
}

export default UserSalary;