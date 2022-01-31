import React from "react";
import { Link } from "react-router-dom";

export const Entry = ({ entry }) => {
    return (
        <li>
            {entry.user.name} - <Link to={`/library/${entry.rudimentId}`}>{entry.rudiment.name}</Link> - {entry.bpm} BPM
        </li>
    );
};
