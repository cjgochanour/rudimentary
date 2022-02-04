import { React, useEffect, useState } from "react";
import { RudimentsData } from "../data_management/RudimentsData.js";
import { Rudiment } from "./Rudiment.js";
import "./Library.css";
import { RudimentForm } from "./RudimentForm.js";

export const Library = () => {
    const [rudiments, setRudiments] = useState([]);

    useEffect(() => {
        RudimentsData.getAllRudiments().then((rudimentArr) => setRudiments(rudimentArr));
    }, []);

    return (
        <>
            <ul className="rudimentList">
                {rudiments.map((rudiment) => (
                    <Rudiment key={rudiment.id} rudiment={rudiment} />
                ))}
            </ul>
            <RudimentForm />
        </>
    );
};
