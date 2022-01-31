import { API, postOptions } from "./Fetch.js";

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
export const isCurrentUserStudent = () => {
    return fetch(`${API}/users/${localStorage.getItem("rude_user")}?_embed=studentsProfile`)
        .then((res) => res.json())
        .then((user) => {
            if (user.studentsProfile.length > 0) {
                return true;
            } else {
                return false;
            }
        });
};