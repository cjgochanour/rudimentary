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

                const organizerObject = {};

                entriesWithProfiles.forEach((ent) => {
                    organizerObject[ent.userId] = [ent];
                });

                const newArr = [];

                for (const key in organizerObject) {
                    const arr = entriesWithProfiles.find((ent) => ent.userId === +key);
                    organizerObject[key] = arr;
                    newArr.push(organizerObject[key]);
                }

                newArr.sort((a, b) => b.bpm - a.bpm);

                setEntries(newArr);
            })
        );
    }, []);

    return (
        <section>
            <h3>Leaderboard</h3>
            <ol>
                {entries.map((entry) => (
                    <LeaderboardEntries key={entry.id} entry={entry} />
                ))}
            </ol>
        </section>
    );
};
