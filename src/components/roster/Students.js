import React, { useEffect, useState } from "react";
import { StudentsProfileData } from "../data_management/StudentsProfileData.js";
import { LeaderboardAccess } from "./LeaderboardAccess.js";
import { Student } from "./Student.js";
import { Container, Table } from "react-bootstrap";

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
        <Container>
            <h1 className="text-center">Roster</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th width="20%">Leaderboard Access</th>
                    </tr>
                </thead>
                <tbody>
                    {instructorStudents.map((student) => (
                        <tr key={student.id}>
                            <Student key={`student--${student.id}`} student={student} />
                            <LeaderboardAccess key={`lb--${student.id}`} student={student} stateSetter={stateSetter} />
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};
