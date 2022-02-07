import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { EntriesData } from "../data_management/EntriesData.js";
import { UsersData } from "../data_management/UsersData.js";
import { StudentEntry } from "./StudentEntry.js";
import { ValidityButtons } from "../requests/ValidityButtons.js";
import { useHistory } from "react-router-dom";

export const StudentDetails = () => {
    const [student, setStudent] = useState({});
    const [entries, setEntries] = useState([]);
    const [isViewerInstructor, setViewer] = useState(false);
    const { studentId } = useParams();
    const history = useHistory();

    const entriesSetter = () => {
        EntriesData.getEntriesByStudent(parseInt(studentId)).then((arr) => setEntries(arr));
    };

    useEffect(() => {
        UsersData.getUserWithDetails(parseInt(studentId)).then((obj) => {
            obj.studentsProfile?.map((p) =>
                p.instructorId === parseInt(localStorage.getItem("rude_user")) ? setViewer(true) : setViewer(false)
            );
            setStudent(obj);
        });
    }, []);

    useEffect(() => {
        entriesSetter();
    }, []);

    const deleteStudent = () => {
        UsersData.deleteUser(student.id).then(() => history.push("/students"));
    };

    return (
        <>
            <h1>{student.name}</h1>
            {student.hasOwnProperty("studentsProfile") && (
                <img src={student.studentsProfile[0].img} alt="student profile picture" />
            )}
            {isViewerInstructor && <button onClick={deleteStudent}>Delete Student</button>}
            <h2>History</h2>
            <ul>
                {entries.map((entry) => (
                    <div key={entry.id}>
                        <StudentEntry entry={entry} />
                        {isViewerInstructor && <ValidityButtons entry={entry} stateSetter={entriesSetter} />}
                    </div>
                ))}
            </ul>
        </>
    );
};
