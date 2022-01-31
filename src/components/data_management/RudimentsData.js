export const getAllRudiments = () => {
    return fetch(`${API}/rudiments`).then((res) => res.json());
};
export const getRudimentById = (id) => {
    return fetch(`${API}/rudiments/${id}`).then((res) => res.json());
};
