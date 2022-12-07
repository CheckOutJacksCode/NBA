import React, { useEffect, useState } from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import Table from "./Table";
//import tableData1 from "../data.json";
import axios from "axios";

const NavBar = () => {
    return (
        <nav>
        <div>
            <a href="/">
                <div id="headtag"><img src="hoopgreen.webp" alt="Home"/></div>
                <div id="tagline"><img src="chucker.webp" alt="Home"/></div>
            </a>
        </div>
        <div> 
            <a href="/">HOME</a>
            <a href="/deepStats" > | DEEP STATS | </a>      
            <a href="/shotCharts" > | SHOT CHARTS | </a>
            <a href="/jackarithm" >JACKARITHM</a>
        </div>
        </nav>
    )
}
export default NavBar;