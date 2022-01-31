import React from "react";

export const Entry = ({ entry }) => {
    return (
        <li>
            {entry.user.name} - {entry.bpm} BPM
        </li>
    );
};
