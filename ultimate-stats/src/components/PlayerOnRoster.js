import React, { useEffect, useState } from "react";
import axios from "axios";
import '../App.css';
import TableBody from "./TableBody";
import TableHead from "./TableHead";
import Price from "./Price";
import { useDrag } from "react-dnd";

const PlayerOnRoster = ({ id, player }) => {

    return (
        <div>
            {player}
        </div>
    )
}

export default PlayerOnRoster;

