import React from "react";
import { Card, Col, Row } from "react-bootstrap";

import { CartPlus, CloudUploadFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <Row className="dash-res">
      <Col sm={6} xs={6}>
        <Card className="bg-default rounded-3 text-lg-start border-1 mb-5 bg-primary border-default">
          <Card.Body>
            <Card.Title className="text-primary">
              <Link className="link nav-item" to="/product-upload">
                <CartPlus size={30} />

                <span style={{ margin: "0px 0px 0px 20px" }}>
                  Product Upload
                </span>
              </Link>
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col sm={6} xs={6}>
        <Card className="bg-default rounded-3 text-lg-start border-1 mb-5 bg-primary border-default">
          <Card.Body>
            <Card.Title className="text-primary">
              <Link className="link nav-item" to="/upload/course">
                <CloudUploadFill size={30} />

                <span style={{ margin: "0px 0px 0px 20px" }}>
                  Course Upload
                </span>
              </Link>
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Nav;
