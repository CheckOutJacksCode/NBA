import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import Price from "./Price";


const ComputerTeamName = ({ cpuRoster, cpuName, setCpuName }) => {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    let names = [
        "Seattle Soggy Sox",
        "Louisville Daffodils",
        "Las Vegas Knuckleheads",
        "Montreal Basketballs",
        "St. Louis Lagers",
        "Mexico City Tenacious Kitties"
    ]

    useEffect(() => {
        const getCpuName = async() => {
            setCpuName(names[getRandomInt(0, names.length)])
        }
        if (cpuRoster.length === 10) {
            getCpuName();
        }
    }, [cpuRoster])

    return (
        <>
            <h4 className="teamName">
                {cpuName ? cpuName : ''}
            </h4>
        </>
    )
}

export default ComputerTeamName;