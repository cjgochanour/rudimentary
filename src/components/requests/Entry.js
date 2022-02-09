import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Entry = ({ entry, showRudiment }) => (
    <ListGroup.Item as="li">
        <Link
            to={{
                pathname: `/students/${entry.userId}`,
                state: { title: entry.user.name },
            }}
        >
            {entry.user.name}
        </Link>
        {" - "}
        {showRudiment && (
            <>
                <Link to={{ pathname: `/library/${entry.rudimentId}`, state: { title: entry.rudiment.name } }}>
                    {entry.rudiment.name}
                </Link>
                {" - "}
            </>
        )}
        {entry.bpm} BPM
    </ListGroup.Item>
);
