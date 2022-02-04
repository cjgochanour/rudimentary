import React from "react";
import { Link } from "react-router-dom";

export const StudentEntry = ({ entry }) => {
    const dateString = new Date(entry.timestamp);
    return (
        <>
            <li>
                {dateString.toLocaleDateString()} -{" "}
                <Link
                    to={{
                        pathname: `/library/${entry.rudimentId}`,
                        state: { title: entry.rudiment.name },
                    }}
                >
                    {entry.rudiment.name}
                </Link>{" "}
                - {entry.bpm} BPM
            </li>
        </>
    );
};
