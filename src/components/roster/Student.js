import React from "react";
import { Link } from "react-router-dom";

export const Student = ({ student }) => (
    <li>
        <Link to={`/students/${student.userId}`}>{student.user.name}</Link>
    </li>
);
