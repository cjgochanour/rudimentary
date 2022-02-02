export const API = "http://localhost:8088";

export const currentUserId = () => +localStorage.getItem("rude_user");

export const postOptions = (obj) => {
    return {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
    };
};
export const putOptions = (obj) => {
    return {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
    };
};
