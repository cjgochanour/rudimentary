import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "../../images/logo.png";
import { isCurrentUserStudent } from "../data_management/UsersData.js";

export const NavBar = () => {
    const [student, setStudent] = useState(true);

    useEffect(() => {
        isCurrentUserStudent().then((res) => setStudent(res));
    }, []);

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link " to="/library">
                    Library
                </Link>
            </li>
            {student ? (
                <li className="navbar__item active">
                    <Link className="navbar__link " to={`/students/${localStorage.getItem("rude_user")}`}>
                        Profile
                    </Link>
                </li>
            ) : (
                <li className="navbar__item active">
                    <Link className="navbar__link " to="/students">
                        Roster
                    </Link>
                </li>
            )}
            <li className="navbar__item active">
                <Link className="navbar_link " to="/library">
                    <img className="logo" src={logo} />
                </Link>
            </li>
            {student ? (
                ""
            ) : (
                <li className="navbar__item">
                    <Link className="navBar__link" to="/entries">
                        Requests
                    </Link>
                </li>
            )}
            <li className="navbar__item active">
                <Link className="navbar_link " to="/login" onClick={() => localStorage.removeItem("rude_user")}>
                    Logout
                </Link>
            </li>
        </ul>
    );
};
