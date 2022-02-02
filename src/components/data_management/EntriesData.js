import { API, putOptions, postOptions, currentUserId } from "./Fetch.js";
import { getUserWithDetails, isCurrentUserStudent } from "./UsersData.js";

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
    return entriesWithProfile;
};

export const filterPendingEntries = (entryArray) =>
    entryArray.filter((entry) => entry.studentProfile?.instructorId === currentUserId());

export const filterEntryArrayByInstructor = (entryArray, stateSetter) => {
    isCurrentUserStudent().then((res) => {
        if (res) {
            getUserWithDetails(currentUserId()).then((currentUser) => {
                debugger;
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
