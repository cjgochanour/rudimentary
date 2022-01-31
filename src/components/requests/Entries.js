import React, { useEffect, useState } from "react";
import { getPendingEntries, addProfileToEntries } from "../data_management/EntriesData.js";
import { getStudentProfiles } from "../data_management/StudentsProfileData.js";
import { Entry } from "./Entry.js";
import { ValidityButtons } from "./ValidityButtons.js";

export const Entries = () => {
    const [entries, setEntries] = useState([]);

    const entriesSetter = () => {
        getPendingEntries().then((entriesArray) => {
            getStudentProfiles().then((studentProfiles) => {
                const entriesWithProfiles = addProfileToEntries(entriesArray, studentProfiles);
                setEntries(entriesWithProfiles);
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
                        <Entry key={`entry--${entry.id}`} entry={entry} />
                        <ValidityButtons key={`btns--${entry.id}`} entry={entry} stateSetter={entriesSetter} />
                    </div>
                ))}
            </ol>
        </>
    );
};
