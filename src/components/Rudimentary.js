import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews.js";
import { Login } from "./auth/Login.js";
import { Register } from "./auth/Register.js";
import { NavBar } from "./nav/NavBar.js";
import "../styles/modified.bootstrap.min.css"

export const Rudimentary = () => {
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case "/students":
                document.title = "Roster - Rudimentary";
                break;
            case "/library":
                document.title = "Rudimentary";
                break;
            case "/entries":
                document.title = "Requests - Rudimentary";
            default:
                if (location.pathname.includes("library/")) {
                    document.title = `${location.state.title} - Rudimentary`;
                    break;
                }
        }
    }, [location.pathname]);

    return (
        <>
            <Route
                render={() => {
                    if (localStorage.getItem("rude_user")) {
                        return (
                            <>
                                <NavBar />
                                <ApplicationViews />
                            </>
                        );
                    } else {
                        return <Redirect to="/login" />;
                    }
                }}
            />

            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </>
    );
};
