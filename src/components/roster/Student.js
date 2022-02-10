import React from "react";
import { Link } from "react-router-dom";

export const Student = ({ student }) => (
    <td>
        <Link
            to={{
                pathname: `/students/${student.userId}`,
                state: { title: student.user.name },
            }}
        >
            {student.user.name}
        </Link>
    </td>
);
