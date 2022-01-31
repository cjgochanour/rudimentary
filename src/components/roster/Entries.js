import React, { useEffect, useState } from "react";
import { getPendingEntries, getStudentProfiles } from "../ApiManager.js";

export const Entries = () => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        getPendingEntries().then((entriesArray) => {
            getStudentProfiles().then((studentProfiles) => {
                const entriesWithProfile = entriesArray.map((entry) => {
                    entry.studentProfile = studentProfiles.find((sp) => sp.userId === entry.userId);
                    return entry;
                });
                const filteredEntries = entriesWithProfile.filter(
                    (entry) => entry.studentProfile?.instructorId === parseInt(localStorage.getItem("rude_user"))
                );
                setEntries(filteredEntries);
            });
        });
    }, []);

    return <></>;
};
