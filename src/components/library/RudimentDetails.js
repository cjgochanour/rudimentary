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
            <h1>
                {rudiment.id}. {rudiment.name}
            </h1>
            <img src={rudiment.img} />
        </>
    );
};
