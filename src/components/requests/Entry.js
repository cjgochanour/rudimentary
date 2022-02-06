import React from "react";
import { Link } from "react-router-dom";

export const Entry = ({ entry, showRudiment }) => (
    <li>
        <Link
            to={{
                pathname: `/students/${entry.userId}`,
                state: { title: entry.user.name },
            }}
        >
            {entry.user.name}
        </Link>
        {" - "}
        {showRudiment && (
            <>
                <Link to={{ pathname: `/library/${entry.rudimentId}`, state: { title: entry.rudiment.name } }}>
                    {entry.rudiment.name}
                </Link>
                {" - "}
            </>
        )}
        {entry.bpm} BPM
    </li>
);
