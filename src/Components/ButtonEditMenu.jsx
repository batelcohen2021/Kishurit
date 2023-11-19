import React from "react";
import { Row, Nav, Container, Navbar } from "react-bootstrap";

const ButtonEditMenu = ({ update }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
      <Container fluid>
        <Row>
          <Nav>
            <Nav.Item>
              <Nav.Link onClick={update}>שמירת מידע</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
      </Container>
    </Navbar>
  );
};

export default ButtonEditMenu;
