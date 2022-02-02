import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRudimentById } from "../data_management/RudimentsData.js";
import { postEntry } from "../data_management/EntriesData.js";
import { isCurrentUserStudent } from "../data_management/UsersData.js";
import { getInstructorsStudents } from "../data_management/StudentsProfileData.js";
import { Leaderboard } from "./Leaderboard.js";

export const RudimentDetails = () => {
    const [rudiment, setRudiment] = useState({});
    const [students, setStudents] = useState([]);
    const [bpm, setBPM] = useState(0);
    const [selectedStudent, setSelectedStudent] = useState(0);
    const [entrySubmitted, setSubmitState] = useState(false);
    const [isSubmitterStudent, setSubmitter] = useState(false);
    const { rudimentId } = useParams();

    useEffect(() => {
        getInstructorsStudents().then(setStudents);
    }, []);

    useEffect(() => {
        isCurrentUserStudent().then(setSubmitter);
    }, []);

    useEffect(() => {
        getRudimentById(+rudimentId).then(setRudiment);
    }, [rudimentId]);

    const submitEntry = () => {
        const userId = isSubmitterStudent ? parseInt(localStorage.getItem("rude_user")) : selectedStudent;
        const entry = {
            bpm,
            userId: userId(),
            rudimentId: parseInt(rudimentId),
            approved: !isSubmitterStudent,
            timestamp: Date.now(),
        };

        postEntry(entry).then(() => setSubmitState(true));
    };

    return (
        <>
            <h1>
                {rudiment.id}. {rudiment.name}
            </h1>
            <img src={rudiment.img} />
            {!entrySubmitted ? (
                <form>
                    {!isSubmitterStudent && (
                        <>
                            <label htmlFor="studentSelector">Student</label>
                            <select
                                name="studentSelector"
                                onChange={(e) => setSelectedStudent(parseInt(e.target.value))}
                            >
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
            ) : (
                <p>Submission Complete</p>
            )}
            {rudiment.id && <Leaderboard rudiment={rudiment} />}
        </>
    );
};
