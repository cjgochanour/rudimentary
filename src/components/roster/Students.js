import React, { useEffect, useState } from "react";
import { StudentsProfileData } from "../data_management/StudentsProfileData.js";
import { LeaderboardAccess } from "./LeaderboardAccess.js";
import { Student } from "./Student.js";

export const Students = () => {
    const [instructorStudents, setStudents] = useState([]);

    const stateSetter = () => {
        StudentsProfileData.getInstructorsStudents().then((studentsArray) => {
            const sortedStudents = studentsArray.sort((x, y) => x.user.name.localeCompare(y.user.name));
            setStudents(sortedStudents);
        });
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
