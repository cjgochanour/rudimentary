import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserByEmail, postUser, getInstructors } from "../data_management/UsersData.js";
import { postStudentProfile } from "../data_management/StudentsProfileData.js";
import "./Login.css";

export const Register = () => {
    const [newUser, setUser] = useState({});
    const [studentProfile, setProfile] = useState({ leaderboardAccess: false });
    const [instructors, setInstructors] = useState([]);
    const [studentChecked, setChecked] = useState(false);
    const conflictDialog = useRef();

    const history = useHistory();

    useEffect(() => getInstructors().then((data) => setInstructors(data)), []);

    const existingUserCheck = () => {
        return getUserByEmail(newUser.email).then((user) => !!user.length);
    };
    const handleRegister = (e) => {
        e.preventDefault();
        existingUserCheck().then((userExists) => {
            if (!userExists) {
                postUser(newUser).then((createdUser) => {
                    if (createdUser.hasOwnProperty("id")) {
                        if (studentChecked) {
                            const sp = { ...studentProfile };
                            sp["userId"] = createdUser.id;
                            postStudentProfile(sp).then(() => {
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
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="button--close" onClick={(e) => conflictDialog.current.close()}>
                    Close
                </button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Registration</h1>
                <fieldset>
                    <label htmlFor="name"> Full Name </label>
                    <input
                        onChange={updateUser}
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="Enter your name"
                        required
                        autoFocus
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input
                        onChange={updateUser}
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email address"
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="studentCheckbox"> Student Registration </label>
                    <input
                        type="checkbox"
                        id="studentCheckbox"
                        className="checkbox"
                        placeholder="Enter your name"
                        onChange={(e) => setChecked(e.target.checked)}
                    />
                </fieldset>
                {studentChecked && (
                    <fieldset>
                        <label htmlFor="instructor"> Select An Instructor </label>
                        <select
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
                        </select>
                    </fieldset>
                )}
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    );
};
