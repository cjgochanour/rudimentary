import { API, postOptions } from "./Fetch.js";

export const getStudentProfiles = () => {
    return fetch(`${API}/studentsProfile`).then((res) => res.json());
};
export const postStudentProfile = (userProfile) => {
    return fetch(`${API}/studentsProfile`, postOptions(userProfile));
};
