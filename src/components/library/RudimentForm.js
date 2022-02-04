import React, { useState } from "react";
import { currentUserId } from "../data_management/Fetch.js";
import { RudimentsData } from "../data_management/RudimentsData.js";

export const RudimentForm = ({ stateSetter }) => {
    const [rudeName, setRude] = useState("");
    const [rudeUrl, setUrl] = useState("");

    const postRude = () => {
        const rudiment = {
            name: rudeName,
            img: rudeUrl,
            userId: currentUserId(),
        };
        RudimentsData.postRudiment(rudiment).then(() => stateSetter());
    };

    return (
        <>
            <label htmlFor="name">
                Excercise Name
                <input type="text" name="name" placeholder="Exercise Name" onChange={(e) => setRude(e.target.value)} />
            </label>
            <label htmlFor="url">
                Image URL
                <input type="text" name="url" placeholder="URL" onChange={(e) => setUrl(e.target.value)} />
            </label>
            <button type="button" onClick={() => postRude()}>
                Create Excercise
            </button>
        </>
    );
};
