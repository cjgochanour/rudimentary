import { React, useEffect, useState } from "react";
import { getAllRudiments } from "../ApiManager.js";
import { Rudiment } from "./Rudiment.js";

export const Library = () => {
    const [rudiments, setRudiments] = useState([]);

    useEffect(() => {
        getAllRudiments().then((rudimentArr) => setRudiments(rudimentArr));
    }, []);

    return (
        <>
            <ul className="rudimentList">
                {rudiments.map((rudiment) => (
                    <Rudiment key={rudiment.id} rudiment={rudiment} />
                ))}
            </ul>
        </>
    );
};
