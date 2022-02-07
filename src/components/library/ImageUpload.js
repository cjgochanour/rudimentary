import React, { useState } from "react";
import { useParams } from "react-router-dom";

export const ImageUpload = ({ urlSetter, urlStatus }) => {
    const [uploading, setUploading] = useState(false);
    const { location } = useParams();

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        location === "/library"
            ? data.append("upload_preset", "customRudiments")
            : data.append("upload_preset", "profilePics");
        setUploading(true);

        const res = await fetch(`https://api.cloudinary.com/v1_1/dcfyvy9gb/image/upload`, {
            method: "POST",
            body: data,
        });

        const file = await res.json();

        urlSetter(file.secure_url);

        setUploading(false);
    };

    return (
        <label htmlFor="upload">
            <input type="file" name="upload" accept="image/*" placeholder="Upload Image" onChange={uploadImage} />
            {uploading ? <p>Uploading...</p> : !uploading && urlStatus?.length > 0 ? <p>Upload Complete</p> : ""}
        </label>
    );
};
