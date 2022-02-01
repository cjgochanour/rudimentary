import React from "react";
import { deleteEntry, getEntryById, putEntry } from "../data_management/EntriesData.js";

export const ValidityButtons = ({ entry, stateSetter }) => {
    const approveEntry = (id) => {
        getEntryById(id).then((ent) => {
            ent.approved = true;
            putEntry(ent, id).then(() => stateSetter());
        });
    };

    const denyEntry = (id) => {
        deleteEntry(id).then(() => stateSetter());
    };

    return (
        <>
            {!entry.approved && (
                <button value={entry.id} onClick={(e) => approveEntry(parseInt(e.target.value))}>
                    Approve
                </button>
            )}
            <button value={entry.id} onClick={(e) => denyEntry(parseInt(e.target.value))}>
                Deny
            </button>
        </>
    );
};
