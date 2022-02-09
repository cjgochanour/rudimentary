import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
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
        <Form>
            {!isStudent && (
                <>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="studentSelector">Student</Form.Label>
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
                <Form.Label htmlFor="bpm">BPM</Form.Label>
                <Form.Control type="number" placeholder="BPM" onChange={(e) => setBPM(+e.target.value)} />
            </Form.Group>
            <Button type="button" onClick={submitEntry}>
                Submit Entry
            </Button>
        </Form>
    );
};
