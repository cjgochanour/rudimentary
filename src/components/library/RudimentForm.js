import React, { useState } from "react";
import { currentUserId } from "../data_management/Fetch.js";
import { RudimentsData } from "../data_management/RudimentsData.js";
import { ImageUpload } from "./ImageUpload.js";

export const RudimentForm = ({ stateSetter }) => {
    const [rudeName, setRude] = useState("");
    const [rudeUrl, setUrl] = useState("");
    const [uploadFile, setUploadFile] = useState(false);

    const postRude = () => {
        const rudiment = {
            name: rudeName,
            img: rudeUrl,
            userId: currentUserId(),
        };
        RudimentsData.postRudiment(rudiment).then(() => stateSetter());
    };

    return (
        <div>
            <label htmlFor="name">
                Excercise Name
                <input type="text" name="name" placeholder="Exercise Name" onChange={(e) => setRude(e.target.value)} />
            </label>
            <label>
                Upload Image via URL
                <input type="radio" name="uploadType" checked={!uploadFile} onChange={() => setUploadFile(false)} />
            </label>
            <label>
                Upload Image via File
                <input type="radio" name="uploadType" checked={uploadFile} onChange={() => setUploadFile(true)} />
            </label>
            {uploadFile ? (
                <ImageUpload urlSetter={setUrl} urlStatus={rudeUrl} />
            ) : (
                <label htmlFor="url">
                    Image URL
                    <input type="text" name="url" placeholder="URL" onChange={(e) => setUrl(e.target.value)} />
                </label>
            )}
            <button type="button" onClick={() => postRude()}>
                Create Excercise
            </button>
        </div>
    );
};
