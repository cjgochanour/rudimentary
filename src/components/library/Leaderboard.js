import React, { useEffect, useState } from "react";
import { addProfileToEntries, filterEntryArrayByInstructor, EntriesData } from "../data_management/EntriesData.js";
import { StudentsProfileData } from "../data_management/StudentsProfileData.js";
import { Entry } from "../requests/Entry.js";

export const Leaderboard = ({ rudiment }) => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        EntriesData.getEntriesByRudiment(rudiment.id).then((entriesArray) =>
            StudentsProfileData.getStudentProfiles().then((studentProfiles) => {
                const entriesWithProfiles = addProfileToEntries(entriesArray, studentProfiles);
                filterEntryArrayByInstructor(entriesWithProfiles, setEntries);
            })
        );
    }, []);

    return (
        <section>
            <h3>Leaderboard</h3>
            <ol>
                {entries?.map((entry) => (
                    <Entry key={entry.id} entry={entry} />
                ))}
            </ol>
        </section>
    );
};
