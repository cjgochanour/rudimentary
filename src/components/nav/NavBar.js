import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { UsersData } from "../data_management/UsersData.js";
import { currentUserId } from "../data_management/Fetch.js";
import { Navbar, Container, Nav } from "react-bootstrap";

export const NavBar = () => {
    const [student, setStudent] = useState(true);

    useEffect(() => {
        UsersData.isCurrentUserStudent().then((res) => setStudent(res));
    }, []);

    return (
        <Navbar variant="light" bg="light" className="justify-content-evenly">
            <Nav justify className="flex-fill" variant="pills">
                <Nav.Item>
                    <Nav.Link href="/library">Library</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    {student ? (
                        <Nav.Link href={`/students/${currentUserId()}`}>Profile</Nav.Link>
                    ) : (
                        <Nav.Link href="/students">Roster</Nav.Link>
                    )}
                </Nav.Item>
                <Nav.Item>
                    <Navbar.Brand href="/library">
                        <img width="100" alt="logo" src={logo} />
                    </Navbar.Brand>
                </Nav.Item>
                <Nav.Item>{!student && <Nav.Link href="/entries">Requests</Nav.Link>}</Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/login" onSelect={() => localStorage.removeItem("rude_user")}>
                        Logout
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    );
};
