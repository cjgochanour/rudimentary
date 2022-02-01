import React from "react";
import { Link } from "react-router-dom";

export const StudentEntry = ({ entry }) => {
    const dateString = new Date(entry.timestamp);
    return (
        <>
            <li>
                {dateString.toLocaleDateString()} -{" "}
                <Link to={`/library/${entry.rudimentId}`}>{entry.rudiment.name}</Link> - {entry.bpm} BPM
            </li>
        </>
    );
};
