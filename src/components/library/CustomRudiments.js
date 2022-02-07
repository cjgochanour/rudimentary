import React, { useEffect, useState } from "react";
import { currentUserId } from "../data_management/Fetch.js";
import { StudentsProfileData } from "../data_management/StudentsProfileData.js";
import { Rudiment } from "./Rudiment.js";

export const CustomRudiments = ({ rudiments, isViewerStudent }) => {
    const [customRudes, setRudes] = useState([]);

    useEffect(() => {
        if (isViewerStudent) {
            StudentsProfileData.getProfileById(currentUserId()).then((sp) => {
                const instructorRudes = rudiments.filter((rude) => rude.userId === sp.instructorId);
                setRudes(instructorRudes);
            });
        } else {
            const myRudes = rudiments.filter((rude) => rude.userId === currentUserId());
            setRudes(myRudes);
        }
    }, [rudiments, isViewerStudent]);
    return (
        <>
            {customRudes.map((rude) => (
                <Rudiment key={rude.id} rudiment={rude} />
            ))}
        </>
    );
};
