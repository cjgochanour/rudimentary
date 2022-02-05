import { React, useEffect, useState } from "react";
import { RudimentsData } from "../data_management/RudimentsData.js";
import { UsersData } from "../data_management/UsersData.js";
import { Rudiment } from "./Rudiment.js";
import "./Library.css";
import { RudimentForm } from "./RudimentForm.js";
import { CustomRudiments } from "./CustomRudiments.js";

export const Library = () => {
    const [baseRudiments, setBaseRudiments] = useState([]);
    const [customRudiments, setCustomRudiments] = useState([]);
    const [isViewerStudent, setViewer] = useState(false);
    const [displayForm, setForm] = useState(false);

    const rudimentsSetter = () => {
        return RudimentsData.getAllRudiments().then((rudimentArr) => {
            const baseArr = [];
            const customArr = [];
            for (const rude of rudimentArr) {
                if (rude.userId === 1) {
                    baseArr.push(rude);
                } else {
                    customArr.push(rude);
                }
            }
            setBaseRudiments(baseArr);
            setCustomRudiments(customArr);
        });
    };

    useEffect(() => {
        rudimentsSetter();
        UsersData.isCurrentUserStudent().then(setViewer);
    }, []);

    return (
        <>
            <h2>Library</h2>
            <ul className="rudimentList">
                {baseRudiments.map((rudiment) => (
                    <Rudiment key={rudiment.id} rudiment={rudiment} />
                ))}
            </ul>
            <h2>Custom Excercises</h2>
            <ul>
                {customRudiments && <CustomRudiments isViewerStudent={isViewerStudent} rudiments={customRudiments} />}
            </ul>
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
