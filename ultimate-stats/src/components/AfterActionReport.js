import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';

const AfterActionReport = ({ gameResult }) => {

    useEffect(() => {

        const getReport = async() => {
            if (gameResult === 'You Win!') {
                console.log('goof')
            }
        }
        getReport()
    }, [])
}

export default AfterActionReport;