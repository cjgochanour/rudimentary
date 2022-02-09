import React, { useState } from "react";
import { Form, Button, Card, FloatingLabel } from "react-bootstrap";
import { EntriesData } from "../data_management/EntriesData.js";

export const EntryForm = ({ students, isStudent, submit, rudimentId, setSubmitState }) => {
    const [bpm, setBPM] = useState(0);
    const [selectedStudent, setSelectedStudent] = useState(0);

    const submitEntry = () => {
        const userId = isStudent ? parseInt(localStorage.getItem("rude_user")) : selectedStudent;
        const entry = {
            bpm,
            userId,
            rudimentId: +rudimentId,
            approved: !isStudent,
            timestamp: Date.now(),
        };

        EntriesData.postEntry(entry).then(() => setSubmitState(true));
    };

    return (
        <Card className="m-3 p-2">
            <Form>
                {!isStudent && (
                    <>
                        <Form.Group className="mb-3">
                            <Form.Select
                                name="studentSelector"
                                onChange={(e) => setSelectedStudent(parseInt(e.target.value))}
                            >
                                <option value={0}>Select A Student</option>
                                {students.map((s) => (
                                    <option key={s.id} value={s.userId}>
                                        {s.user.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </>
                )}
                <Form.Group className="mb-3">
                    <FloatingLabel label="BPM" htmlFor="bpm">
                        <Form.Control type="number" placeholder="BPM" onChange={(e) => setBPM(+e.target.value)} />
                    </FloatingLabel>
                </Form.Group>
                <Button variant="success" type="button" onClick={submitEntry}>
                    Submit Entry
                </Button>
            </Form>
        </Card>
    );
};
