import { API, putOptions, postOptions } from "./Fetch.js";

export const getEntryById = (id) => {
    return fetch(`${API}/entries/${id}`).then((res) => res.json());
};
export const getPendingEntries = () => {
    return fetch(`${API}/entries?approved=false&_expand=user&_expand=rudiment`).then((res) => res.json());
};
export const postEntry = (entryObject) => {
    return fetch(`${API}/entries`, postOptions(entryObject));
};
export const putEntry = (entryObject, id) => {
    return fetch(`${API}/entries/${id}`, putOptions(entryObject));
};
export const deleteEntry = (id) => {
    return fetch(`${API}/entries/${id}`, { method: "DELETE" });
};

export const addProfileToEntries = (entriesArray, studentProfiles) => {
    const entriesWithProfile = entriesArray.map((entry) => {
        entry.studentProfile = studentProfiles.find((sp) => sp.userId === entry.userId);
        return entry;
    });
    const filteredEntries = entriesWithProfile.filter(
        (entry) => entry.studentProfile?.instructorId === parseInt(localStorage.getItem("rude_user"))
    );
    return filteredEntries;
};
