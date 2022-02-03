import React, { useEffect, useState } from "react";
import { StudentsProfileData } from "../data_management/StudentsProfileData.js";
import { LeaderboardAccess } from "./LeaderboardAccess.js";
import { Student } from "./Student.js";

export const Students = () => {
    const [instructorStudents, setStudents] = useState([]);

    const stateSetter = () => {
        StudentsProfileData.getInstructorsStudents().then((studentsArray) => setStudents(studentsArray));
    };

    useEffect(() => {
        stateSetter();
    }, []);

    return (
        <>
            <h1>Roster</h1>
            <ul>
                {instructorStudents.map((student) => (
                    <div key={student.id}>
                        <Student key={`student--${student.id}`} student={student} />
                        <LeaderboardAccess key={`lb--${student.id}`} student={student} stateSetter={stateSetter} />
                    </div>
                ))}
            </ul>
        </>
    );
};
