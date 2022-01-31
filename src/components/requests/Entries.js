import React, { useEffect, useState } from "react";
import { getPendingEntries, getStudentProfiles } from "../ApiManager.js";
import { Entry } from "./Entry.js";
import { ValidityButtons } from "./ValidityButtons.js";

export const Entries = () => {
    const [entries, setEntries] = useState([]);

    const addProfileToEntries = (entriesArray, studentProfiles) => {
        const entriesWithProfile = entriesArray.map((entry) => {
            entry.studentProfile = studentProfiles.find((sp) => sp.userId === entry.userId);
            return entry;
        });
        const filteredEntries = entriesWithProfile.filter(
            (entry) => entry.studentProfile?.instructorId === parseInt(localStorage.getItem("rude_user"))
        );
        return filteredEntries;
    };

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
