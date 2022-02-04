import React, { useEffect, useState } from "react";

export const CustomRudiments = ({ rudiments }) => {
    const [customRudes, setRudes] = useState([]);

    useEffect(() => {
        const filteredRudes = rudiments.filter((rudiment) => Object.hasOwn(rudiment, "userId"));
        setRudes(filteredRudes);
    }, [rudiments]);
    return <></>;
};
