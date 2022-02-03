import { API, currentUserId, postOptions } from "./Fetch.js";

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
