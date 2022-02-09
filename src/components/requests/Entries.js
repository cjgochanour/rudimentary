import React, { useEffect, useState } from "react";
import { addProfileToEntries, filterPendingEntries, EntriesData } from "../data_management/EntriesData.js";
import { StudentsProfileData } from "../data_management/StudentsProfileData.js";
import { Entry } from "./Entry.js";
import { ValidityButtons } from "./ValidityButtons.js";
import { Container, ListGroup, Stack } from "react-bootstrap";

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
        <Container>
            <h1 className="text-center">Pending Entries</h1>
            <ListGroup className="text-center">
                {entries.map((entry) => (
                    <Stack key={`stack--${entry.id}`} direction="horizontal" className="mx-auto p-2">
                        <Entry entry={entry} showRudiment={true} />
                        <ValidityButtons entry={entry} stateSetter={entriesSetter} />
                    </Stack>
                ))}
            </ListGroup>
        </Container>
    );
};
