import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import './App.css';

function Navbar() {
  return (
    
    <nav>
      <div className="navdiv">
        <a href="/">
            <div id="headtag"><img className="navdiv" src="hoopscoop12.png" alt="Home"/></div>
        </a>
      </div>
      <div className="navLinks">
      <ul>
        <li>
          <Link className="link" to="/">$35 Fantasy Baller</Link>
        </li>
        <li>
          <Link  className="link" to="/deepStats">Cumulative Stats</Link>
        </li>
        <li>
          <Link  className="link" to="/shotCharts">Shot Charts</Link>
        </li>
        <li>
          <Link  className="link" to="/jackarithm">Predictions</Link>
        </li>
      </ul>
      </div>
    </nav>
  );
}

export default Navbar;