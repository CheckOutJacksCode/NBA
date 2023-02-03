import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import Price from "./Price";


const ComputerSalary = ({ cpuRoster }) => {

    return (
        <div className="teamSalary">
            <span>Current Computer Salary:</span>
            <br></br>
            {cpuRoster.length === 10 ? "$35" : "$0"}
        </div>
    )
}

export default ComputerSalary;