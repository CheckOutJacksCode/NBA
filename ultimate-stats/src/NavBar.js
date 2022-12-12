import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import './App.css';

function Navbar() {
  return (
    
    <nav>
      <div>
        <a href="/">
            <div id="headtag"><img src="hoopgreen.webp" alt="Home"/></div>
            <div id="tagline"><img src="chucker.webp" alt="Home"/></div>
        </a>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/deepStats">Deep Stats</Link>
        </li>
        <li>
          <Link to="/shotCharts">Shot Charts</Link>
        </li>
        <li>
          <Link to="/jackarithm">Jack-O-Rithm</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;