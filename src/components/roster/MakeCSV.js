import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

export const MakeCSV = ({ arr, student }) => {
    const [newArr, setNewArr] = useState([]);

    useEffect(() => {
        const copy = [...arr];

        let filtered = [];

        copy.forEach((ent) => {
            const newDate = new Date(ent.timestamp);
            return filtered.push({
                Date: newDate.toLocaleDateString(),
                Rudiment: ent.rudiment.name,
                BPM: ent.bpm,
            });
        });

        console.log(filtered);

        setNewArr(filtered);
    }, [arr]);

    return (
        <CSVLink data={newArr} filename={`${student.name} history.csv`}>
            Download CSV
        </CSVLink>
    );
};
