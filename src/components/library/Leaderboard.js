import React, { useEffect, useState } from "react";
import { addProfileToEntries, filterEntryArrayByInstructor, EntriesData } from "../data_management/EntriesData.js";
import { StudentsProfileData } from "../data_management/StudentsProfileData.js";
import { Entry } from "../requests/Entry.js";
import { Card, ListGroup } from "react-bootstrap";

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
        <Card className="p-3 m-3 w-50 mx-auto">
            <h3 className="text-center">Leaderboard</h3>
            <ListGroup className="text-center" as="ol" numbered>
                {entries?.map((entry) => (
                    <Entry key={entry.id} entry={entry} />
                ))}
            </ListGroup>
        </Card>
    );
};
