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
                <h2>Library</h2>
                <Row lg="4" md="3" sm="2" xs="1">
                    {baseRudiments.map((rudiment) => (
                        <Rudiment key={rudiment.id} rudiment={rudiment} />
                    ))}
                </Row>
            </Container>
            <Container>
                <h2>Custom Excercises</h2>
                <Row lg="4" md="3" sm="2" xs="1">
                    {customRudiments && (
                        <CustomRudiments isViewerStudent={isViewerStudent} rudiments={customRudiments} />
                    )}
                </Row>
                {!isViewerStudent && displayForm ? (
                    <>
                        <Button className="align-center" onClick={() => setForm(false)}>
                            Hide Form
                        </Button>
                        <RudimentForm stateSetter={rudimentsSetter} />
                    </>
                ) : !isViewerStudent ? (
                    <Button onClick={() => setForm(true)}>Add Rudiment</Button>
                ) : (
                    ""
                )}
            </Container>
        </>
    );
};
