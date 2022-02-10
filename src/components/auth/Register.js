import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { UsersData } from "../data_management/UsersData.js";
import { StudentsProfileData } from "../data_management/StudentsProfileData.js";
import "./Login.css";
import { ImageUpload } from "../library/ImageUpload.js";
import { Container, Row, Col, Form, FloatingLabel, Button } from "react-bootstrap";

export const Register = () => {
    const [newUser, setUser] = useState({});
    const [studentProfile, setProfile] = useState({ leaderboardAccess: false });
    const [profileImg, setImg] = useState("");
    const [instructors, setInstructors] = useState([]);
    const [studentChecked, setChecked] = useState(false);
    const conflictDialog = useRef();
    document.title = "Register - Rudimentary";

    const history = useHistory();

    useEffect(() => UsersData.getInstructors().then((data) => setInstructors(data)), []);

    const existingUserCheck = () => {
        return UsersData.getUserByEmail(newUser.email).then((user) => !!user.length);
    };
    const handleRegister = (e) => {
        e.preventDefault();
        existingUserCheck().then((userExists) => {
            if (!userExists) {
                UsersData.postUser(newUser).then((createdUser) => {
                    if (createdUser.hasOwnProperty("id")) {
                        if (studentChecked) {
                            const sp = { ...studentProfile };
                            sp["userId"] = createdUser.id;
                            profileImg.length > 0
                                ? (sp["img"] = profileImg)
                                : (sp["img"] =
                                      "https://res.cloudinary.com/dcfyvy9gb/image/upload/defaults/ok9tqdl7bz9izu8bbkzh.jpg");
                            StudentsProfileData.postStudentProfile(sp).then(() => {
                                localStorage.setItem("rude_user", createdUser.id);
                                history.push("/library");
                            });
                        } else {
                            localStorage.setItem("rude_user", createdUser.id);
                            history.push("/library");
                        }
                    }
                });
            } else {
                conflictDialog.current.showModal();
            }
        });
    };

    const updateUser = (evt) => {
        const copy = { ...newUser };
        copy[evt.target.id] = evt.target.value;
        setUser(copy);
    };

    const updateStudentProfile = (evt) => {
        const copy = { ...studentProfile };
        copy[evt.target.id] = parseInt(evt.target.value);
        setProfile(copy);
    };

    return (
        <Container>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={(e) => conflictDialog.current.close()}>
                    Close
                </button>
            </dialog>
            <Row>
                <h1 className="text-center mt-3">Registration</h1>
            </Row>
            <Form className="w-75 mx-auto" onSubmit={handleRegister}>
                <Row className="m-2">
                    <FloatingLabel label="Full Name">
                        <Form.Control
                            onChange={updateUser}
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Full Name"
                            required
                            autoFocus
                        />
                    </FloatingLabel>
                </Row>
                <Row className="m-2">
                    <FloatingLabel label="Email Address">
                        <input
                            onChange={updateUser}
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email Address"
                            required
                        />
                    </FloatingLabel>
                </Row>
                <Row className="m-3">
                    <Form.Check
                        type="switch"
                        id="studentCheckbox"
                        label="Student Registration"
                        placeholder="Enter your name"
                        onChange={(e) => setChecked(e.target.checked)}
                    />
                </Row>
                {studentChecked && (
                    <Row>
                        <Col>
                            <FloatingLabel label="Instructor">
                                <Form.Select
                                    onChange={updateStudentProfile}
                                    name="instructor"
                                    id="instructorId"
                                    className="form-control"
                                    required
                                >
                                    <option value="">Please Select Your Instructor</option>
                                    {instructors.map((inst) => (
                                        <option key={inst.id} value={inst.id} name="instructor">
                                            {inst.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <label htmlFor="profileImg"> Upload a Profile Picture (optional) </label>
                            <ImageUpload urlStatus={profileImg} urlSetter={setImg} />
                        </Col>
                    </Row>
                )}
                <Row className="mt-2 justify-content-center">
                    <Col xs="4">
                        <Button type="submit">Register</Button>
                    </Col>
                    <Col xs="4">
                        <Button onClick={() => history.push("/login")}>Back to Login</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};
