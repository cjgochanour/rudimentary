import React from "react";

export const LeaderboardEntries = ({ entry }) => {
    return (
        <li>
            {entry.user.name} - {entry.bpm} BPM
        </li>
    );
};
