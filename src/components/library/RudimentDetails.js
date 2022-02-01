import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRudimentById } from "../data_management/RudimentsData.js";
import { postEntry } from "../data_management/EntriesData.js";
import { isCurrentUserStudent } from "../data_management/UsersData.js";
import { getInstructorsStudents } from "../data_management/StudentsProfileData.js";

export const RudimentDetails = () => {
    const [rudiment, setRudiment] = useState({});
    const [students, setStudents] = useState([]);
    const [bpm, setBPM] = useState(0);
    const [entrySubmitted, setSubmitState] = useState(false);
    const [student, setStudent] = useState(true);
    const { rudimentId } = useParams();

    useEffect(() => {
        getInstructorsStudents().then((studentsArray) => setStudents(studentsArray));
    }, []);

    useEffect(() => {
        isCurrentUserStudent().then((res) => setStudent(res));
    });

    useEffect(() => {
        getRudimentById(parseInt(rudimentId)).then((data) => setRudiment(data));
    }, []);

    const submitEntry = () => {
        const entry = {
            bpm,
            userId: parseInt(localStorage.getItem("rude_user")),
            rudimentId: parseInt(rudimentId),
            approved: false,
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
            {!entrySubmitted && student ? (
                <form>
                    <label htmlFor="bpm">BPM</label>
                    <input type="number" placeholder="BPM" onChange={(e) => setBPM(parseInt(e.target.value))} />
                    <button type="button" onClick={submitEntry}>
                        Submit Entry
                    </button>
                </form>
            ) : student ? (
                <p>Submission Complete</p>
            ) : (
                ""
            )}
        </>
    );
};
