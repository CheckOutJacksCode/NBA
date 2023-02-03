import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import Price from "./Price";

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