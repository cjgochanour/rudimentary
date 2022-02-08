import React, { useState } from "react";
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
        <form>
            {!isStudent && (
                <>
                    <label htmlFor="studentSelector">Student</label>
                    <select name="studentSelector" onChange={(e) => setSelectedStudent(parseInt(e.target.value))}>
                        <option value={0}>Select A Student</option>
                        {students.map((s) => (
                            <option key={s.id} value={s.userId}>
                                {s.user.name}
                            </option>
                        ))}
                    </select>
                </>
            )}
            <label htmlFor="bpm">BPM</label>
            <input type="number" placeholder="BPM" onChange={(e) => setBPM(+e.target.value)} />
            <button type="button" onClick={submitEntry}>
                Submit Entry
            </button>
        </form>
    );
};
