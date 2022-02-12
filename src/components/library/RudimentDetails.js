import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RudimentsData } from "../data_management/RudimentsData.js";
import { UsersData } from "../data_management/UsersData.js";
import { StudentsProfileData } from "../data_management/StudentsProfileData.js";
import { Leaderboard } from "./Leaderboard.js";
import { currentUserId } from "../data_management/Fetch.js";
import Metronome from "@kevinorriss/react-metronome";
import "./RudimentDetails.css";
import { EntryForm } from "./EntryForm.js";
import { Card, Container, Row, Col, Modal, ButtonGroup, Button, ToggleButton } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export const RudimentDetails = () => {
    const [rudiment, setRudiment] = useState({});
    const [students, setStudents] = useState([]);
    const [entrySubmitted, setSubmitState] = useState(false);
    const [isSubmitterStudent, setSubmitter] = useState(false);
    const [lbAccess, setLb] = useState(false);
    const [userView, setUserView] = useState("none");
    const [showMetronome, setMetronome] = useState(false);
    const [showDelete, setDelete] = useState(false);
    const history = useHistory();
    const { rudimentId } = useParams();

    useEffect(() => {
        StudentsProfileData.getInstructorsStudents().then(setStudents);
    }, []);

    useEffect(() => {
        UsersData.isCurrentUserStudent().then(setSubmitter);
    }, []);

    useEffect(() => {
        RudimentsData.getRudimentById(+rudimentId).then(setRudiment);
    }, [rudimentId]);

    useEffect(() => {
        if (isSubmitterStudent) {
            StudentsProfileData.hasLeaderboardAccess(currentUserId()).then(setLb);
        } else {
            setLb(true);
        }
    }, [isSubmitterStudent]);

    const rudimentDelete = () => {
        RudimentsData.deleteRudiment(rudimentId).then(() => history.push("/library"));
    };

    const handleUserView = (str) => {
        if (userView === str) {
            return setUserView("none");
        } else {
            return setUserView(str);
        }
    };

    return (
        <Container>
            <Modal show={showDelete} onHide={() => setDelete(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Rudiment</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this rudiment? This action cannot be undone.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDelete(false)}>
                        No, Take Me Back!
                    </Button>
                    <Button variant="danger" onClick={() => rudimentDelete()}>
                        Yes, Delete.
                    </Button>
                </Modal.Footer>
            </Modal>
            <Card className="mt-3">
                <Card.Title>
                    <Row>
                        <Col />
                        <Col>
                            <h1 className="text-center">
                                {rudiment.id}. {rudiment.name}
                            </h1>
                        </Col>
                        <Col className="my-auto d-flex justify-content-end">
                            {currentUserId() === rudiment.userId && (
                                <Button className="me-5" onClick={() => setDelete(true)} variant="danger">
                                    Delete Rudiment
                                </Button>
                            )}
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Img src={rudiment.img} />
            </Card>
            <Row className="justify-content-sm-center pt-3">
                <ButtonGroup type="radio" name="userView" value={userView} onChange={handleUserView}>
                    <ToggleButton
                        variant="outline-info"
                        type="radio"
                        checked={userView === "metronome"}
                        onClick={() => (userView === "metronome" ? setUserView("none") : setUserView("metronome"))}
                    >
                        Metronome
                    </ToggleButton>
                    <ToggleButton
                        variant="outline-info"
                        type="radio"
                        checked={userView === "entry"}
                        onClick={() => (userView === "entry" ? setUserView("none") : setUserView("entry"))}
                    >
                        Create An Entry
                    </ToggleButton>
                    {lbAccess && (
                        <ToggleButton
                            variant="outline-info"
                            type="radio"
                            checked={userView === "lb"}
                            onClick={() => (userView === "lb" ? setUserView("none") : setUserView("lb"))}
                        >
                            View Leaderboard
                        </ToggleButton>
                    )}
                </ButtonGroup>
            </Row>
            {userView === "metronome" && (
                <div className="metronome mx-auto mt-3">
                    <Metronome startBpm={120} />
                </div>
            )}
            {!entrySubmitted && userView === "entry" ? (
                <EntryForm
                    students={students}
                    isStudent={isSubmitterStudent}
                    rudimentId={rudimentId}
                    setSubmitState={setSubmitState}
                />
            ) : entrySubmitted ? (
                <p>Submission Complete</p>
            ) : (
                ""
            )}
            {rudiment.id && lbAccess && userView === "lb" && <Leaderboard rudiment={rudiment} />}
        </Container>
    );
};
