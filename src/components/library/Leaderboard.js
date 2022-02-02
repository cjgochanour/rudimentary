import React, { useEffect, useState } from "react";
import { addProfileToEntries, getEntriesByRudiment } from "../data_management/EntriesData.js";
import { getStudentProfiles } from "../data_management/StudentsProfileData.js";
import { LeaderboardEntries } from "./LeaderboardEntries.js";

export const Leaderboard = ({ rudiment }) => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        getEntriesByRudiment(rudiment.id).then((entriesArray) =>
            getStudentProfiles().then((studentProfiles) => {
                const entriesWithProfiles = addProfileToEntries(entriesArray, studentProfiles);
                setEntries(entriesWithProfiles);
            })
        );
    });

    return (
        <section>
            <h3>Leaderboard</h3>
            <ol>
                {entries.map((entry) => (
                    <LeaderboardEntries entry={entry} />
                ))}
            </ol>
        </section>
    );
};
