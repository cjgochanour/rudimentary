import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { getEntriesByStudent } from "../data_management/EntriesData.js";
import { getUserWithDetails } from "../data_management/UsersData.js";
import { StudentEntry } from "./StudentEntry.js";
import { ValidityButtons } from "../requests/ValidityButtons.js";

export const StudentDetails = () => {
    const [student, setStudent] = useState({});
    const [entries, setEntries] = useState([]);
    const [isViewerInstructor, setViewer] = useState(false);
    const { studentId } = useParams();

    const entriesSetter = () => {
        getEntriesByStudent(parseInt(studentId)).then((arr) => setEntries(arr));
    };

    useEffect(() => {
        getUserWithDetails(parseInt(studentId)).then((obj) => {
            obj.studentsProfile?.map((p) =>
                p.instructorId === parseInt(localStorage.getItem("rude_user")) ? setViewer(true) : setViewer(false)
            );
            return setStudent(obj);
        });
    }, []);

    useEffect(() => {
        entriesSetter();
    }, []);

    return (
        <>
            <h1>{student.name}</h1>
            <h2>History</h2>
            <ul>
                {entries.map((entry) => (
                    <div key={entry.id}>
                        <StudentEntry entry={entry} />
                        {isViewerInstructor ? <ValidityButtons entry={entry} stateSetter={entriesSetter} /> : ""}
                    </div>
                ))}
            </ul>
        </>
    );
};
