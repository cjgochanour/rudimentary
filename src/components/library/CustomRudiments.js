import React, { useEffect, useState } from "react";
import { currentUserId } from "../data_management/Fetch.js";
import { StudentsProfileData } from "../data_management/StudentsProfileData.js";

export const CustomRudiments = ({ rudiments, isViewerStudent }) => {
    const [customRudes, setRudes] = useState([]);

    useEffect(() => {
        const filteredRudes = rudiments.filter((rudiment) => Object.hasOwn(rudiment, "userId"));
        if (isViewerStudent) {
            StudentsProfileData.getProfileById(currentUserId()).then((sp) => {
                const instructorRudes = filteredRudes.filter((rude) => rude.userId === sp.instructorId);
                console.log(instructorRudes);
                setRudes(instructorRudes);
            });
        } else {
            const myRudes = filteredRudes.filter((rude) => rude.userId === currentUserId());
            console.log(myRudes);
            setRudes(myRudes);
        }
    }, [rudiments, isViewerStudent]);
    return <></>;
};
