import { React, useEffect, useState } from "react";
import { RudimentsData } from "../data_management/RudimentsData.js";
import { UsersData } from "../data_management/UsersData.js";
import { Rudiment } from "./Rudiment.js";
import "./Library.css";
import { RudimentForm } from "./RudimentForm.js";
import { CustomRudiments } from "./CustomRudiments.js";

export const Library = () => {
    const [rudiments, setRudiments] = useState([]);
    const [isViewerStudent, setViewer] = useState(false);
    const [displayForm, setForm] = useState(false);

    const rudimentsSetter = () => RudimentsData.getAllRudiments().then((rudimentArr) => setRudiments(rudimentArr));

    useEffect(() => {
        rudimentsSetter();
        UsersData.isCurrentUserStudent().then(setViewer);
    }, []);

    return (
        <>
            <ul className="rudimentList">
                {rudiments.map((rudiment) => (
                    <Rudiment key={rudiment.id} rudiment={rudiment} />
                ))}
            </ul>
            <ul>{rudiments && <CustomRudiments isViewerStudent={isViewerStudent} rudiments={rudiments} />}</ul>
            {!isViewerStudent && displayForm ? (
                <>
                    <button onClick={() => setForm(false)}>-</button>
                    <RudimentForm stateSetter={rudimentsSetter} />
                </>
            ) : !isViewerStudent ? (
                <button onClick={() => setForm(true)}>+</button>
            ) : (
                ""
            )}
        </>
    );
};
