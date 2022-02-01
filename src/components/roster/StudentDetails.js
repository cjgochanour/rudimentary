import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { getUserWithDetails } from "../data_management/UsersData.js";

export const StudentDetails = () => {
    const [student, setStudent] = useState({});
    const { studentId } = useParams();

    useEffect(() => {
        getUserWithDetails(parseInt(studentId)).then((obj) => setStudent(obj));
    }, []);

    return (
        <>
            <h1>{student.name}</h1>
            <h2>History</h2>
        </>
    );
};
