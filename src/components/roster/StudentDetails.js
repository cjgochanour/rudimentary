import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { EntriesData } from "../data_management/EntriesData.js";
import { UsersData } from "../data_management/UsersData.js";
import { StudentEntry } from "./StudentEntry.js";
import { ValidityButtons } from "../requests/ValidityButtons.js";
import { useHistory } from "react-router-dom";
import { MakeCSV } from "./MakeCSV.js";
import { Container, Image, Row, Col, Button, Form } from "react-bootstrap";

export const StudentDetails = () => {
    const [student, setStudent] = useState({});
    const [entries, setEntries] = useState([]);
    const [sortedByDate, setSorted] = useState(true);
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

    const sortByDate = () => {
        const copy = [...entries];
        const sorted = copy.sort((a, b) => b.timestamp - a.timestamp);
        setEntries(sorted);
        setSorted(true);
    };

    const sortByRudiment = () => {
        const copy = [...entries];
        const sorted = copy.sort((a, b) => a.rudimentId - b.rudimentId);
        setEntries(sorted);
        setSorted(false);
    };

    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <h1>{student.name}</h1>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col />
                    <Col md="auto">
                        {student.hasOwnProperty("studentsProfile") && (
                            <Image
                                roundedCircle
                                width="200px"
                                height="200px"
                                src={student.studentsProfile[0].img}
                                alt="student profile picture"
                            />
                        )}
                    </Col>
                    <Col className="align-self-end">
                        {isViewerInstructor && (
                            <Button variant="danger" onClick={deleteStudent}>
                                Delete Student
                            </Button>
                        )}
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row className="justify-content-md-center p-5">
                    <Col md="auto">
                        <h2>History</h2>
                    </Col>
                </Row>
                <Form.Check
                    label="Sort by Date"
                    type="radio"
                    checked={sortedByDate}
                    name="sort"
                    onChange={() => sortByDate()}
                />
                <MakeCSV arr={entries} student={student} />
                <Form.Check label="Sort by Rudiment" type="radio" name="sort" onChange={() => sortByRudiment()} />
                <ul>
                    {entries.map((entry) => (
                        <div key={entry.id}>
                            <StudentEntry entry={entry} />
                            {isViewerInstructor && <ValidityButtons entry={entry} stateSetter={entriesSetter} />}
                        </div>
                    ))}
                </ul>
            </Container>
        </>
    );
};
