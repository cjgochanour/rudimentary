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
import Button from "react-bootstrap/Button";
import { Card, Container, Row, Col } from "react-bootstrap";

export const RudimentDetails = () => {
    const [rudiment, setRudiment] = useState({});
    const [students, setStudents] = useState([]);
    const [entrySubmitted, setSubmitState] = useState(false);
    const [isSubmitterStudent, setSubmitter] = useState(false);
    const [lbAccess, setLb] = useState(false);
    const [userView, setUserView] = useState("none");
    const [showMetronome, setMetronome] = useState(false);
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

    return (
        <>
            <Container>
                <Card className="mt-3">
                    <Card.Title>
                        <h1 className="text-center">
                            {rudiment.id}. {rudiment.name}
                        </h1>
                    </Card.Title>
                    <Card.Img src={rudiment.img} />
                </Card>
                <Row className="justify-content-sm-center pt-3">
                    <Col sm="auto">
                        <Button onClick={() => setMetronome(!showMetronome)}>Metronome</Button>
                    </Col>
                    <Col sm="auto">
                        <Button onClick={() => (userView === "entry" ? setUserView("none") : setUserView("entry"))}>
                            Create An Entry
                        </Button>
                    </Col>
                    <Col sm="auto">
                        {lbAccess && (
                            <Button onClick={() => (userView === "lb" ? setUserView("none") : setUserView("lb"))}>
                                View Leaderboard
                            </Button>
                        )}
                    </Col>
                </Row>
                {showMetronome && (
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
        </>
    );
};
