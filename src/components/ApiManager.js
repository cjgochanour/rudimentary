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
    return fetch(`${API}/users/${id}&_embed=studentsProfile`).then((res) => res.json());
};
export const postUser = (userObject) => {
    return fetch(`${API}/instructors`, postOptions(userObject));
};
export const getAllRudiments = () => {
    return fetch(`${API}/rudiments`).then((res) => res.json());
};
