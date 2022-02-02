import React, { useEffect, useState } from "react";
import { addProfileToEntries, getEntriesByRudiment } from "../data_management/EntriesData.js";
import { getStudentProfiles } from "../data_management/StudentsProfileData.js";

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

    return <></>;
};
