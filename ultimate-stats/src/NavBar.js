import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import './App.css';


function Navbar() {
  return (
    
    <nav>
      <div id="headtag" className="navdiv">
        <div className="nav-item">
          <Link to="/">
            <img src="ball7.png" className="ball" alt="Home"/>
          </Link>
        </div>
        <div className="court-container">
          <img src="court5.png" className="court" alt="court"/>
        </div>
        <div className="nav-item">
          <Link className="link" to="/fantasy">
                                        FANTASY DRAFT
                                        <br></br>
                                        MINI GAME</Link>
        </div>
        <div className="nav-item">
          <Link  className="link" to="/shotCharts">SHOT
                                                    <br></br>
                                                    CHARTS</Link>
        </div>
        <div className="nav-item">
          <Link  className="link" to="/jackarithm">ODDS &
                                                    <br></br>
                                                    PREDICTIONS</Link>
        </div> 
      </div>
    </nav>
  );
}

export default Navbar;