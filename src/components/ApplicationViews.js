import React from "react";
import { Route } from "react-router-dom";
import { Library } from "./library/Library.js";

export const ApplicationViews = () => {
    return (
        <Route exact path="/library">
            <Library />
        </Route>
    );
};
