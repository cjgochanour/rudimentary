import React from "react";
import { EntriesData } from "../data_management/EntriesData.js";

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
                <button value={entry.id} onClick={(e) => approveEntry(e.target.value)}>
                    Approve
                </button>
            )}
            <button value={entry.id} onClick={(e) => denyEntry(e.target.value)}>
                Delete
            </button>
        </>
    );
};
