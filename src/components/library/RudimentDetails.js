import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRudimentById, postEntry } from "../ApiManager.js";

export const RudimentDetails = () => {
    const [rudiment, setRudiment] = useState({});
    const [bpm, setBPM] = useState(0);
    const [entrySubmitted, setSubmitState] = useState(false);
    const { rudimentId } = useParams();

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
            {!entrySubmitted ? (
                <form>
                    <label htmlFor="bpm">BPM</label>
                    <input type="number" placeholder="BPM" onChange={(e) => setBPM(parseInt(e.target.value))} />
                    <button type="button" onClick={submitEntry}>
                        Submit Entry
                    </button>
                </form>
            ) : (
                <p>Submission Complete</p>
            )}
        </>
    );
};
