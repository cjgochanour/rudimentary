import { React, useEffect, useState } from "react";
import { getAllRudiments } from "../ApiManager.js";

export const Library = () => {
    const [rudiments, setRudiments] = useState([]);

    useEffect(() => {
        getAllRudiments().then((rudimentArr) => setRudiments(rudimentArr));
    }, []);

    return <></>;
};
