import { API, putOptions, postOptions, currentUserId } from "./Fetch.js";
import { UsersData } from "./UsersData.js";

export const addProfileToEntries = (entriesArray, studentProfiles) => {
    const entriesWithProfile = entriesArray.map((entry) => {
        entry.studentProfile = studentProfiles.find((sp) => sp.userId === entry.userId);
        return entry;
    });
    return entriesWithProfile;
};

export const filterPendingEntries = (entryArray) =>
    entryArray.filter((entry) => entry.studentProfile?.instructorId === currentUserId());

export const filterEntryArrayByInstructor = (entryArray, stateSetter) => {
    UsersData.isCurrentUserStudent().then((res) => {
        if (res) {
            UsersData.getUserWithDetails(currentUserId()).then((currentUser) => {
                const filteredEntries = entryArray.filter(
                    (entry) => entry.studentProfile?.instructorId === currentUser.studentsProfile[0]?.instructorId
                );
                return oneEntryPerStudent(filteredEntries, stateSetter);
            });
        } else {
            const filteredEntries = entryArray.filter(
                (entry) => entry.studentProfile?.instructorId === currentUserId()
            );
            return oneEntryPerStudent(filteredEntries, stateSetter);
        }
    });
};

export const oneEntryPerStudent = (entryArray, stateSetter) => {
    const organizerObject = {};
    entryArray.forEach((ent) => {
        organizerObject[ent.userId] = [ent];
    });

    const newArr = [];

    for (const key in organizerObject) {
        const arr = entryArray.find((ent) => ent.userId === +key);
        organizerObject[key] = arr;
        newArr.push(organizerObject[key]);
    }

    newArr.sort((a, b) => b.bpm - a.bpm);

    stateSetter(newArr);

    return newArr;
};

export const EntriesData = {
    async getEntryById(id) {
        return await fetch(`${API}/entries/${id}`).then((res) => res.json());
    },
    async getPendingEntries() {
        return await fetch(`${API}/entries?approved=false&_expand=user&_expand=rudiment`).then((res) => res.json());
    },
    async getEntriesByStudent(id) {
        return await fetch(`${API}/entries?userId=${id}&_expand=rudiment&_sort=timestamp&_order=desc`).then((res) =>
            res.json()
        );
    },
    async getEntriesByRudiment(id) {
        return await fetch(`${API}/entries?rudimentId=${id}&_expand=user&_sort=bpm&_order=desc`).then((res) =>
            res.json()
        );
    },
    async postEntry(entryObject) {
        return await fetch(`${API}/entries`, postOptions(entryObject));
    },
    async putEntry(entryObject, id) {
        return await fetch(`${API}/entries/${id}`, putOptions(entryObject));
    },
    async deleteEntry(id) {
        return await fetch(`${API}/entries/${id}`, { method: "DELETE" });
    },
};
