import React, { useEffect, useState } from "react";
import { getInstructorsStudents } from "../data_management/StudentsProfileData.js";

export const Students = () => {
    const [instructorStudents, setStudents] = useState([]);

    useEffect(() => {
        getInstructorsStudents().then((studentsArray) => setStudents(studentsArray));
    }, []);

    return (
        <>
            <h1>Roster</h1>
            {instructorStudents.map((student) => {})}
        </>
    );
};
