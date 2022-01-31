import React, { useEffect, useState } from "react";
import { getPendingEntries } from "../data_management/EntriesData.js";
import { getStudentProfiles } from "../data_management/StudentsProfileData.js";
import { Entry } from "./Entry.js";
import { ValidityButtons } from "./ValidityButtons.js";

export const Entries = () => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        getPendingEntries().then((entriesArray) => {
            getStudentProfiles().then((studentProfiles) => {
                setEntries(addProfileToEntries(entriesArray, studentProfiles));
            });
        });
    }, []);

    return (
        <>
            <h1>Pending Entries</h1>
            <ol>
                {entries.map((entry) => (
                    <>
                        <Entry entry={entry} />
                        <ValidityButtons entry={entry} stateSetter={setEntries} />
                    </>
                ))}
            </ol>
        </>
    );
};
