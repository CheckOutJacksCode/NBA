import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import './App.css';

function Navbar() {
  return (
    
    <nav>
      <div className="navdiv">
        <a href="/">
            <div id="headtag"><img className="navdiv" src="hoopscoop.png" alt="Home"/></div>
        </a>
      </div>
      <ul>
        <li>
          <Link to="/">$35 Fantasy Baller</Link>
        </li>
        <li>
          <Link to="/deepStats">Cumulative Stats</Link>
        </li>
        <li>
          <Link to="/shotCharts">Shot Charts</Link>
        </li>
        <li>
          <Link to="/jackarithm">Predictions</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;