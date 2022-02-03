import { API, currentUserId, postOptions } from "./Fetch.js";

export const getStudentProfiles = () => {
    return fetch(`${API}/studentsProfile`).then((res) => res.json());
};
export const postStudentProfile = (userProfile) => {
    return fetch(`${API}/studentsProfile`, postOptions(userProfile));
};
export const getInstructorsStudents = () => {
    return fetch(`${API}/studentsProfile?instructorId=${currentUserId()}&_expand=user`).then((res) => res.json());
};

export const StudentsProfileData = {
    async getStudentProfiles() {
        return await fetch(`${API}/studentsProfile`).then((res) => res.json());
    },
    async postStudentProfile(userProfile) {
        return await fetch(`${API}/studentsProfile`, postOptions(userProfile));
    },
    async getInstructorsStudents() {
        return await fetch(`${API}/studentsProfile?instructorId=${currentUserId()}&_expand=user`).then((res) =>
            res.json()
        );
    },
};
