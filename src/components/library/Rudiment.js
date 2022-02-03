import React from "react";
import { Link } from "react-router-dom";

export const Rudiment = ({ rudiment }) => (
    <Link to={`/library/${rudiment.id}`}>
        <li>
            {rudiment.id}. {rudiment.name}
        </li>
    </Link>
);
