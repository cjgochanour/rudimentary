import { API, postOptions, currentUserId } from "./Fetch.js";

export const UsersData = {
    async getUserByEmail(email) {
        return await fetch(`${API}/users?email=${email}`).then((res) => res.json());
    },
    async getUserWithDetails(id) {
        return await fetch(`${API}/users/${id}?_embed=studentsProfile`).then((res) => res.json());
    },
    async getInstructors() {
        return await fetch(`${API}/users?_embed=studentsProfile`)
            .then((res) => res.json())
            .then((usersArray) => {
                const instructors = usersArray.filter((user) => !user.studentsProfile.length && user.name !== "Admin");
                return instructors;
            });
    },
    async postUser(userObject) {
        return await fetch(`${API}/users`, postOptions(userObject)).then((res) => res.json());
    },
    async isCurrentUserStudent() {
        return await fetch(`${API}/users/${currentUserId()}?_embed=studentsProfile`)
            .then((res) => res.json())
            .then((user) => user.studentsProfile.length > 0);
    },
    async deleteUser(id) {
        return await fetch(`${API}/users/${id}`, { method: "DELETE" });
    },
};
