import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRudimentById } from "../ApiManager.js";

export const RudimentDetails = () => {
    const [rudiment, setRudiment] = useState({});
    const { rudimentId } = useParams();

    useEffect(() => {
        getRudimentById(parseInt(rudimentId)).then((data) => setRudiment(data));
    }, []);

    return (
        <>
            <p>You've made it to the {rudimentId} page!</p>
            <p>That means you're viewing the {rudiment.name} rudiment!</p>
        </>
    );
};
