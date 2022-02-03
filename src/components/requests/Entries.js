import React, { useEffect, useState } from "react";
import { addProfileToEntries, filterPendingEntries, EntriesData } from "../data_management/EntriesData.js";
import { StudentsProfileData } from "../data_management/StudentsProfileData.js";
import { Entry } from "./Entry.js";
import { ValidityButtons } from "./ValidityButtons.js";

export const Entries = () => {
    const [entries, setEntries] = useState([]);

    const entriesSetter = () => {
        EntriesData.getPendingEntries().then((entriesArray) => {
            StudentsProfileData.getStudentProfiles().then((studentProfiles) => {
                const entriesWithProfiles = addProfileToEntries(entriesArray, studentProfiles);
                const filteredEntries = filterPendingEntries(entriesWithProfiles);
                setEntries(filteredEntries);
            });
        });
    };

    useEffect(() => {
        entriesSetter();
    }, []);

    return (
        <>
            <h1>Pending Entries</h1>
            <ol>
                {entries.map((entry) => (
                    <div key={`div--${entry.id}`}>
                        <Entry entry={entry} />
                        <ValidityButtons entry={entry} stateSetter={entriesSetter} />
                    </div>
                ))}
            </ol>
        </>
    );
};
