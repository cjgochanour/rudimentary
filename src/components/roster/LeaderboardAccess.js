import React from "react";
import { StudentsProfileData } from "../data_management/StudentsProfileData.js";
import { Form } from "react-bootstrap";

export const LeaderboardAccess = ({ student, stateSetter }) => {
    const leaderboardPrivelages = (e) => {
        const copy = { ...student };
        copy.leaderboardAccess = e.target.checked;
        delete copy.user;
        StudentsProfileData.putStudentsProfile(copy, copy.id).then(() => stateSetter());
    };
    return (
        <td>
            <Form.Check type="switch" checked={student.leaderboardAccess} onChange={(e) => leaderboardPrivelages(e)} />
        </td>
    );
};
