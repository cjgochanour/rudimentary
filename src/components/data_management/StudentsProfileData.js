import { API, currentUserId, postOptions } from "./Fetch.js";

export const getStudentProfiles = () => {
    return fetch(`${API}/studentsProfile`).then((res) => res.json());
};
export const postStudentProfile = (userProfile) => {
    return fetch(`${API}/studentsProfile`, postOptions(userProfile));
};
export const getInstructorsStudents = () => {
    return fetch(`${API}/studentsProfile?instructorId=${currentUserId}&_expand=user`).then((res) => res.json());
};
