import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import Price from "./Price";

const ErrorMessages = ({ errorMessage, setErrorMessage, roster }) => {
    
    useEffect(() => {
        const resetError = async() => {
            setErrorMessage('');
        }
        if (errorMessage === 'Must draft 10 players' && roster.length === 10) {
            resetError();
        }
    }, [roster])

    return (
        <div className="errorMessage">
            { roster.length > 0 ? errorMessage : '' }
        </div>
    )

}

export default ErrorMessages;