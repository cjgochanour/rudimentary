import { API, putOptions, postOptions, currentUserId } from "./Fetch.js";

export const getEntryById = (id) => {
    return fetch(`${API}/entries/${id}`).then((res) => res.json());
};
export const getPendingEntries = () => {
    return fetch(`${API}/entries?approved=false&_expand=user&_expand=rudiment`).then((res) => res.json());
};
export const getEntriesByStudent = (id) => {
    return fetch(`${API}/entries?userId=${id}&_expand=rudiment&_sort=timestamp&_order=desc`).then((res) => res.json());
};
export const getEntriesByRudiment = (id) => {
    return fetch(`${API}/entries?rudimentId=${id}&_expand=user&_sort=bpm&_order=desc`).then((res) => res.json());
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
        (entry) => entry.studentProfile?.instructorId === currentUserId()
    );
    return filteredEntries;
};
