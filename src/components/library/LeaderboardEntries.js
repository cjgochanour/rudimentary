import React from "react";

export const LeaderboardEntries = ({ entry }) => (
    <li>
        {entry.user.name} - {entry.bpm} BPM
    </li>
);
