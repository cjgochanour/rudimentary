import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Rudiment = ({ rudiment }) => (
    <Col className="mb-3">
        <Card className="p-3">
            <Card.Title className="text-center">
                <Link
                    to={{
                        pathname: `/library/${rudiment.id}`,
                        state: { title: rudiment.name },
                    }}
                >
                    {rudiment.id}. {rudiment.name}
                </Link>
            </Card.Title>
        </Card>
    </Col>
);
