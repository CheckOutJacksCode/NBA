import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import Price from "./Price";

const LockButton = ({ lockFlag, setLockFlag, roster, errorMessage, setErrorMessage }) => {

    function toggleLockFlag(event) {
        setLockFlag(true);
    }

    function sendError() {
        setErrorMessage('Must draft 10 players')
    }

    return (
        <button onClick={roster.length === 10 ? toggleLockFlag : sendError}>Lock In Roster</button>
    )
}

export default LockButton;