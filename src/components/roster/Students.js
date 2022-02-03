import React, { useEffect, useState } from "react";
import { StudentsProfileData } from "../data_management/StudentsProfileData.js";
import { Student } from "./Student.js";

export const Students = () => {
    const [instructorStudents, setStudents] = useState([]);

    useEffect(() => {
        StudentsProfileData.getInstructorsStudents().then((studentsArray) => setStudents(studentsArray));
    }, []);

    return (
        <>
            <h1>Roster</h1>
            <ul>
                {instructorStudents.map((student) => (
                    <Student key={student.id} student={student} />
                ))}
            </ul>
        </>
    );
};
