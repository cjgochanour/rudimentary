import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRudimentById } from "../ApiManager.js";

export const RudimentDetails = () => {
    const [rudiment, setRudiment] = useState({});
    const [bpm, setBPM] = useState(0);
    const { rudimentId } = useParams();

    useEffect(() => {
        getRudimentById(parseInt(rudimentId)).then((data) => setRudiment(data));
    }, []);

    return (
        <>
            <h1>
                {rudiment.id}. {rudiment.name}
            </h1>
            <img src={rudiment.img} />
            <form>
                <label for="bpm">BPM</label>
                <input type="number" placeholder={0} onChange={(e) => setBPM(parseInt(e.target.value))} />
                <button type="submit">Submit Entry</button>
            </form>
        </>
    );
};
