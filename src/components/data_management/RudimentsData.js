import { API } from "./Fetch.js";

export const getAllRudiments = () => {
    return fetch(`${API}/rudiments`).then((res) => res.json());
};
export const getRudimentById = (id) => {
    return fetch(`${API}/rudiments/${id}`).then((res) => res.json());
};

export const RudimentsData = {
    async getAllRudiments() {
        return await fetch(`${API}/rudiments`).then((res) => res.json());
    },
    async getRudimentById(id) {
        return await fetch(`${API}/rudiments/${id}`).then((res) => res.json());
    },
};
