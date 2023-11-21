import React from "react";
import { Row, Nav, Container, Navbar } from "react-bootstrap";

import updateDB from "../funcs";

const ButtonEditMenu = ({ info }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
      <Container fluid>
        <Row>
          <Nav>
            <Nav.Item>
              <Nav.Link onClick={() => updateDB(info)}>שמירת מידע</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
      </Container>
    </Navbar>
  );
};

export default ButtonEditMenu;
