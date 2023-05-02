import React, { useEffect, useState } from "react";
import '../App.css';


const LockButton = ({ lockFlag, setLockFlag, roster, errorMessage, setErrorMessage }) => {

    function toggleLockFlag(event) {
        setLockFlag(true);
    }

    function sendError() {
        setErrorMessage('MUST DRAFT 10 PLAYERS')
    }

    return (
        <button className="lockButton" onClick={roster.length === 10 ? toggleLockFlag : sendError}>LOCK IN ROSTER</button>
    )
}

export default LockButton;