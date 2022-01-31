const API = "http://localhost:8088";

const postOptions = (obj) => {
    return {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
    };
};

export const getUserByEmail = (email) => {
    return fetch(`${API}/users?email=${email}`).then((res) => res.json());
};
export const getUserWithDetails = (id) => {
    return fetch(`${API}/users/${id}?_embed=studentsProfile`).then((res) => res.json());
};
export const getInstructors = () => {
    return fetch(`${API}/users?_embed=studentsProfile`)
        .then((res) => res.json())
        .then((usersArray) => {
            const instructors = usersArray.filter((user) => !user.studentsProfile.length && user.name !== "Admin");
            return instructors;
        });
};
export const postUser = (userObject) => {
    return fetch(`${API}/users`, postOptions(userObject)).then((res) => res.json());
};
export const getStudentProfiles = () => {
    return fetch(`${API}/studentsProfile`).then((res) => res.json());
};
export const postStudentProfile = (userProfile) => {
    return fetch(`${API}/studentsProfile`, postOptions(userProfile));
};
export const getAllRudiments = () => {
    return fetch(`${API}/rudiments`).then((res) => res.json());
};
export const getRudimentById = (id) => {
    return fetch(`${API}/rudiments/${id}`).then((res) => res.json());
};
export const getPendingEntries = () => {
    return fetch(`${API}/entries?approved=false`).then((res) => res.json());
};

export const postEntry = (entryObject) => {
    return fetch(`${API}/entries`, postOptions(entryObject));
};
