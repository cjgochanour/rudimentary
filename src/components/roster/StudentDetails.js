import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { EntriesData } from "../data_management/EntriesData.js";
import { UsersData } from "../data_management/UsersData.js";
import { StudentEntry } from "./StudentEntry.js";
import { ValidityButtons } from "../requests/ValidityButtons.js";
import { useHistory } from "react-router-dom";
import { MakeCSV } from "./MakeCSV.js";
import { Container, Image, Row, Col, Button, Form, Table, Modal } from "react-bootstrap";

export const StudentDetails = () => {
    const [student, setStudent] = useState({});
    const [entries, setEntries] = useState([]);
    const [sortedByDate, setSorted] = useState(true);
    const [isViewerInstructor, setViewer] = useState(false);
    const [showDelete, setDelete] = useState(false);
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

    const sortByExercise = () => {
        const copy = [...entries];
        const sorted = copy.sort((a, b) => a.rudimentId - b.rudimentId);
        setEntries(sorted);
        setSorted(false);
    };

    return (
        <>
            <Container>
                <Modal show={showDelete} onHide={() => setDelete(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Student</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete {student.name}? This action cannot be undone.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setDelete(false)}>
                            No, Take Me Back!
                        </Button>
                        <Button variant="danger" onClick={() => deleteStudent()}>
                            Yes, Delete.
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Row className="justify-content-sm-center">
                    <Col sm="auto">
                        <h1>{student.name}</h1>
                    </Col>
                </Row>
                <Row className="justify-content-sm-center">
                    <Col />
                    <Col sm="auto">
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
                            <Button variant="danger" onClick={() => setDelete(true)}>
                                Delete Student
                            </Button>
                        )}
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row className="justify-content-sm-center pt-5 pb-2">
                    <Col sm="auto">
                        <h2>History</h2>
                    </Col>
                </Row>
                <Row className="justify-content-sm-evenly pb-4">
                    <Col sm="auto">
                        <Form.Check
                            label="Sort by Date"
                            type="radio"
                            checked={sortedByDate}
                            name="sort"
                            onChange={() => sortByDate()}
                        />
                        <Form.Check
                            label="Sort by Exercise"
                            type="radio"
                            name="sort"
                            onChange={() => sortByExercise()}
                        />
                    </Col>
                    <Col sm="auto">
                        <MakeCSV arr={entries} student={student} />
                    </Col>
                </Row>
                <Table className="px-3" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Rudiment</th>
                            <th>BPM</th>
                            {isViewerInstructor && <th>Modify</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {entries.map((entry) => (
                            <tr key={`tr--${entry.id}`}>
                                <StudentEntry entry={entry} />
                                {isViewerInstructor && (
                                    <td>
                                        <ValidityButtons entry={entry} stateSetter={entriesSetter} />
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};
