import React, { useState } from "react";
import { Form, Card, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { currentUserId } from "../data_management/Fetch.js";
import { RudimentsData } from "../data_management/RudimentsData.js";
import { ImageUpload } from "./ImageUpload.js";

export const RudimentForm = ({ stateSetter }) => {
    const [rudeName, setRude] = useState("");
    const [rudeUrl, setUrl] = useState("");
    const [uploadFile, setUploadFile] = useState(false);

    const postRude = () => {
        const rudiment = {
            name: rudeName,
            img: rudeUrl,
            userId: currentUserId(),
        };
        RudimentsData.postRudiment(rudiment).then(() => stateSetter());
    };

    return (
        <Card className="m-3 p-3">
            <Form>
                <FloatingLabel htmlFor="name" label="Excercise Name" className="mb-3">
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Exercise Name"
                        onChange={(e) => setRude(e.target.value)}
                    />
                </FloatingLabel>
                <Row className="my-3">
                    <Col>
                        <Form.Check
                            type="radio"
                            label="Upload Image via URL"
                            name="uploadType"
                            checked={!uploadFile}
                            onChange={() => {
                                setUploadFile(false);
                                setUrl("");
                            }}
                        />
                        <Form.Check
                            type="radio"
                            label="Upload Image via File"
                            name="uploadType"
                            checked={uploadFile}
                            onChange={() => {
                                setUploadFile(true);
                                setUrl("");
                            }}
                        />
                    </Col>
                    <Col>
                        {uploadFile ? (
                            <ImageUpload urlSetter={setUrl} urlStatus={rudeUrl} />
                        ) : (
                            <FloatingLabel htmlFor="url" label="URL">
                                <Form.Control
                                    type="text"
                                    name="url"
                                    placeholder="URL"
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </FloatingLabel>
                        )}
                    </Col>
                </Row>
                <Button type="button" variant="success" onClick={() => postRude()}>
                    Create Excercise
                </Button>
            </Form>
        </Card>
    );
};
