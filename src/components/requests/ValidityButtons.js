import React from "react";
import { deleteEntry, getEntryById, getPendingEntries, putEntry } from "../ApiManager.js";

export const ValidityButtons = ({ entry, stateSetter }) => {
    const approveEntry = (id) => {
        getEntryById(id).then((ent) => {
            ent.approved = true;
            putEntry(ent, id);
        });
    };

    const denyEntry = (id) => {
        deleteEntry(id);
    };

    return (
        <>
            <button value={entry.id} onClick={(e) => approveEntry(parseInt(e.target.value))}>
                Approve
            </button>
            <button value={entry.id} onClick={(e) => denyEntry(parseInt(e.target.value))}>
                Deny
            </button>
        </>
    );
};
