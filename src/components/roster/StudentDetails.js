import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { getEntriesByStudent } from "../data_management/EntriesData.js";
import { getUserWithDetails } from "../data_management/UsersData.js";
import { StudentEntry } from "./StudentEntry.js";

export const StudentDetails = () => {
    const [student, setStudent] = useState({});
    const [entries, setEntries] = useState([]);
    const { studentId } = useParams();

    useEffect(() => {
        getUserWithDetails(parseInt(studentId)).then((obj) => setStudent(obj));
    }, []);

    useEffect(() => {
        getEntriesByStudent(parseInt(studentId)).then((arr) => setEntries(arr));
    });

    return (
        <>
            <h1>{student.name}</h1>
            <h2>History</h2>
            <ul>
                {entries.map((entry) => (
                    <StudentEntry key={entry.id} entry={entry} />
                ))}
            </ul>
        </>
    );
};
