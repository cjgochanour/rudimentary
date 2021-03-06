import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoSymbol from "../../images/logoSymbol_dm.png";
import { UsersData } from "../data_management/UsersData.js";
import { currentUserId } from "../data_management/Fetch.js";
import { Navbar, Nav, Image } from "react-bootstrap";

export const NavBar = () => {
    const [student, setStudent] = useState(true);

    useEffect(() => {
        UsersData.isCurrentUserStudent().then((res) => setStudent(res));
    }, []);

    return (
        <Navbar variant="dark" bg="dark">
            <Nav justify className="flex-fill align-items-center">
                <Nav.Item>
                    <Nav.Link href="/library">Library</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    {student ? (
                        <Link className="nav-link" to={{
                            pathname: `/students/${currentUserId()}`,
                            state: { title: "My Profile" },
                        }}>Profile</Link>
                    ) : (
                        <Nav.Link href="/students">Roster</Nav.Link>
                    )}
                </Nav.Item>
                <Nav.Item>
                    <Navbar.Brand className="mx-auto" href="/library">
                        <Image width="45" alt="logo" src={logoSymbol} />
                    </Navbar.Brand>
                </Nav.Item>
                <Nav.Item>{!student && <Nav.Link href="/entries">Requests</Nav.Link>}</Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/login" onClick={() => localStorage.removeItem("rude_user")}>
                        Logout
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    );
};
