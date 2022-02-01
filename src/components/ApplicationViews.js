import React from "react";
import { Route } from "react-router-dom";
import { Library } from "./library/Library.js";
import { RudimentDetails } from "./library/RudimentDetails.js";
import { Entries } from "./requests/Entries.js";
import { StudentDetails } from "./roster/StudentDetails.js";
import { Students } from "./roster/Students.js";

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path={["/library", "/"]}>
                <Library />
            </Route>
            <Route exact path="/library/:rudimentId(\d+)">
                <RudimentDetails />
            </Route>
            <Route exact path="/entries">
                <Entries />
            </Route>
            <Route exact path="/students/:studentId(\d+)">
                <StudentDetails />
            </Route>
            <Route exact path="/students">
                <Students />
            </Route>
        </>
    );
};
