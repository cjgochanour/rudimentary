import React from "react";
import { Link } from "react-router-dom";

export const Entry = ({ entry }) => {
    return (
        <li>
            <Link to={`/students/${entry.userId}`}>{entry.user.name}</Link> -{" "}
            <Link to={`/library/${entry.rudimentId}`}>{entry.rudiment.name}</Link> - {entry.bpm} BPM
        </li>
    );
};
