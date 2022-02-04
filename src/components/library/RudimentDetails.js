import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RudimentsData } from "../data_management/RudimentsData.js";
import { EntriesData } from "../data_management/EntriesData.js";
import { UsersData } from "../data_management/UsersData.js";
import { StudentsProfileData } from "../data_management/StudentsProfileData.js";
import { Leaderboard } from "./Leaderboard.js";
import { currentUserId } from "../data_management/Fetch.js";

export const RudimentDetails = () => {
    const [rudiment, setRudiment] = useState({});
    const [students, setStudents] = useState([]);
    const [bpm, setBPM] = useState(0);
    const [selectedStudent, setSelectedStudent] = useState(0);
    const [entrySubmitted, setSubmitState] = useState(false);
    const [isSubmitterStudent, setSubmitter] = useState(false);
    const [lbAccess, setLb] = useState(false);
    const [userView, setUserView] = useState("none");
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

    const submitEntry = () => {
        const userId = isSubmitterStudent ? parseInt(localStorage.getItem("rude_user")) : selectedStudent;
        const entry = {
            bpm,
            userId,
            rudimentId: parseInt(rudimentId),
            approved: !isSubmitterStudent,
            timestamp: Date.now(),
        };

        EntriesData.postEntry(entry).then(() => setSubmitState(true));
    };

    return (
        <>
            <h1>
                {rudiment.id}. {rudiment.name}
            </h1>
            <img src={rudiment.img} />
            <button onClick={() => (userView === "entry" ? setUserView("none") : setUserView("entry"))}>
                Create An Entry
            </button>
            {lbAccess && (
                <button onClick={() => (userView === "lb" ? setUserView("none") : setUserView("lb"))}>
                    View Leaderboard
                </button>
            )}
            {!entrySubmitted && userView === "entry" ? (
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
            ) : entrySubmitted ? (
                <p>Submission Complete</p>
            ) : (
                ""
            )}
            {rudiment.id && lbAccess && userView === "lb" && <Leaderboard rudiment={rudiment} />}
        </>
    );
};
