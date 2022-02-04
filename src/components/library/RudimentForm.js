import React, { useState } from "react";

export const RudimentForm = () => {
    const [rudeName, setRude] = useState("");
    const [rudeUrl, setUrl] = useState("");

    return (
        <>
            <label htmlFor="name">
                Name
                <input type="text" name="name" onChange={(e) => setRude(e.target.value)} />
            </label>
            <label htmlFor="url">
                Image URL
                <input type="text" name="url" onChange={(e) => setUrl(e.target.value)} />
            </label>
        </>
    );
};
