import React, { useRef, useState } from "react";
import { Container, Form, Image, Row, Button, FloatingLabel, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { UsersData } from "../data_management/UsersData.js";
import logo from "../../images/logo_dm.png";
import "./Login.css";

export const Login = () => {
    const [email, set] = useState("");
    const existDialog = useRef();
    const history = useHistory();
    document.title = "Rudimentary";

    const existingUserCheck = () => {
        return UsersData.getUserByEmail(email).then((user) => (user.length ? user[0] : false));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        existingUserCheck().then((exists) => {
            if (exists) {
                localStorage.setItem("rude_user", exists.id);
                history.push("/library");
            } else {
                existDialog.current.showModal();
            }
        });
    };

    return (
        <Container>
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={(e) => existDialog.current.close()}>
                    Close
                </button>
            </dialog>
            <Row className="w-50 mx-auto m-5">
                <Image src={logo} />
            </Row>
            <Form className="w-50 mx-auto" onSubmit={handleLogin}>
                <Row className="mb-3 pt-3">
                    <FloatingLabel label="Email Address" className="mb-3">
                        <Form.Control
                            type="email"
                            placeholder="Email Address"
                            onChange={(evt) => set(evt.target.value)}
                            required
                            autoFocus
                        />
                    </FloatingLabel>
                </Row>
                <Row className="justify-content-sm-center">
                    <Col xs="4" className="m-1">
                        <Button type="submit">Login</Button>
                    </Col>
                    <Col xs="4" className="m-1">
                        <Button onClick={() => history.push("/register")}>Register</Button>{" "}
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};
