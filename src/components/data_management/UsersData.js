import { API, postOptions, currentUserId } from "./Fetch.js";

export const getUserByEmail = (email) => {
    return fetch(`${API}/users?email=${email}`).then((res) => res.json());
};
export const getUserWithDetails = async (id) => {
    return await fetch(`${API}/users/${id}?_embed=studentsProfile`).then((res) => res.json());
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
export const isCurrentUserStudent = async () => {
    return await fetch(`${API}/users/${currentUserId()}?_embed=studentsProfile`)
        .then((res) => res.json())
        .then((user) => user.studentsProfile.length > 0);
};

export const UsersData = {
    getUserByEmail(email) {
        return fetch(`${API}/users?email=${email}`).then((res) => res.json());
    },
};
