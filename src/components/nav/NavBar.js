import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import logo from "../../images/logo.png";
import { UsersData } from "../data_management/UsersData.js";
import { currentUserId } from "../data_management/Fetch.js";

export const NavBar = () => {
    const [student, setStudent] = useState(true);

    useEffect(() => {
        UsersData.isCurrentUserStudent().then((res) => setStudent(res));
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
                    <Link
                        className="navbar__link "
                        to={{
                            pathname: `/students/${currentUserId()}`,
                            state: { title: "My Profile" },
                        }}
                    >
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
