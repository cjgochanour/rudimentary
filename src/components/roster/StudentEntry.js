import React from "react";
import { Link } from "react-router-dom";

export const StudentEntry = ({ entry }) => {
    const dateString = new Date(entry.timestamp);
    return (
        <>
            <td>{dateString.toLocaleDateString()}</td>
            <td>
                <Link
                    to={{
                        pathname: `/library/${entry.rudimentId}`,
                        state: { title: entry.rudiment.name },
                    }}
                >
                    {entry.rudiment.name}
                </Link>
            </td>
            <td>{entry.bpm}</td>
        </>
    );
};
