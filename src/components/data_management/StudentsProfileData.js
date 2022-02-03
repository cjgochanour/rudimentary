import { API, currentUserId, postOptions, putOptions } from "./Fetch.js";

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
    async putStudentsProfile(obj, id) {
        return await fetch(`${API}/studentsProfile/${id}`, putOptions(obj));
    },
    async hasLeaderboardAccess(id) {
        return await fetch(`${API}/studentsProfile?userId=${id}`)
            .then((res) => res.json())
            .then((sp) => {
                debugger;
                if (sp.leaderboardAccess || sp.length === 0) {
                    return true;
                } else {
                    return false;
                }
            });
    },
};
