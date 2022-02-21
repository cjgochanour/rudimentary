import { React, useEffect, useState } from "react";
import { RudimentsData } from "../data_management/RudimentsData.js";
import { UsersData } from "../data_management/UsersData.js";
import { Rudiment } from "./Rudiment.js";
import "./Library.css";
import { RudimentForm } from "./RudimentForm.js";
import { CustomRudiments } from "./CustomRudiments.js";
import { Container, Row, Button } from "react-bootstrap";

export const Library = () => {
    const [baseRudiments, setBaseRudiments] = useState([]);
    const [customRudiments, setCustomRudiments] = useState([]);
    const [isViewerStudent, setViewer] = useState(false);
    const [displayForm, setForm] = useState(false);

    const rudimentsSetter = () => {
        return RudimentsData.getAllRudiments().then((rudimentArr) => {
            const baseArr = [];
            const customArr = [];
            for (const rude of rudimentArr) {
                if (rude.userId === 1) {
                    baseArr.push(rude);
                } else {
                    customArr.push(rude);
                }
            }
            setBaseRudiments(baseArr);
            setCustomRudiments(customArr);
        });
    };

    useEffect(() => {
        rudimentsSetter();
        UsersData.isCurrentUserStudent().then(setViewer);
    }, []);

    return (
        <>
            <Container>
                <h2 className="text-center mt-2">Library</h2>
                <Row lg="4" md="3" sm="2" xs="1">
                    {baseRudiments.map((rudiment) => (
                        <Rudiment key={rudiment.id} rudiment={rudiment} />
                    ))}
                </Row>
            </Container>
            <Container>
                <h2 className="text-center mt-2">Custom Exercises</h2>
                <Row lg="4" md="3" sm="2" xs="1">
                    {customRudiments && (
                        <CustomRudiments isViewerStudent={isViewerStudent} rudiments={customRudiments} />
                    )}
                </Row>
                <Row className="mx-auto mb-4 mt-2">
                    {!isViewerStudent && displayForm ? (
                        <>
                            <Button onClick={() => setForm(false)}>Hide Form</Button>
                            <RudimentForm stateSetter={rudimentsSetter} />
                        </>
                    ) : !isViewerStudent ? (
                        <Button onClick={() => setForm(true)}>Add Exercise</Button>
                    ) : (
                        ""
                    )}
                </Row>
            </Container>
        </>
    );
};
