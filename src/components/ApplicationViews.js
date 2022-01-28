import React from "react";
import { Route } from "react-router-dom";
import { Library } from "./library/Library.js";
import { RudimentDetails } from "./library/RudimentDetails.js";

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/library">
                <Library />
            </Route>
            <Route exact path="/library/:rudimentId(\d+)">
                <RudimentDetails />
            </Route>
        </>
    );
};