import React from "react";
import { EntriesData } from "../data_management/EntriesData.js";
import { Button } from "react-bootstrap";

export const ValidityButtons = ({ entry, stateSetter }) => {
    const approveEntry = (id) => {
        EntriesData.getEntryById(id).then((ent) => {
            ent.approved = true;
            EntriesData.putEntry(ent, id).then(() => stateSetter());
        });
    };

    const denyEntry = (id) => {
        EntriesData.deleteEntry(id).then(() => stateSetter());
    };

    return (
        <>
            {!entry.approved && (
                <Button
                    variant="outline-success"
                    className="mx-1"
                    size="sm"
                    value={entry.id}
                    onClick={(e) => approveEntry(e.target.value)}
                >
                    Approve
                </Button>
            )}
            <Button variant="outline-danger" size="sm" value={entry.id} onClick={(e) => denyEntry(e.target.value)}>
                Delete
            </Button>
        </>
    );
};
