import React from "react";
import { Link } from "react-router-dom";

export const Rudiment = ({ rudiment }) => (
    <Link
        to={{
            pathname: `/library/${rudiment.id}`,
            state: { title: rudiment.name },
        }}
    >
        <li>
            {rudiment.id}. {rudiment.name}
        </li>
    </Link>
);
