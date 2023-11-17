import React from "react";
import { Row, Nav, Container, Navbar } from "react-bootstrap";

const ButtonMenu = ({ setShow1, setShow2 }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
      <Container fluid>
        <Row>
          <Nav>
            <Nav.Item>
              <Nav.Link onClick={() => setShow1(true)}>טופס להגשת עסק</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => setShow2(true)}>שלוח הודעה</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
      </Container>
    </Navbar>
  );
};

export default ButtonMenu;
