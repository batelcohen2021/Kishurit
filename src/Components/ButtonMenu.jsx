import React from "react";
import { Row, Nav, Container, Navbar, Button } from "react-bootstrap";
import { isBrowser } from "react-device-detect";

const ButtonMenu = ({ setShow1, setShow2 }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
      <Container fluid>
        <Row>
          {isBrowser ? (
            <Nav>
              <Nav.Item>
                <Nav.Link onClick={() => setShow1(true)}>
                  טופס להגשת עסק
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setShow2(true)}>לשלוח הודעה</Nav.Link>
              </Nav.Item>
            </Nav>
          ) : (
            <Nav>
              <Nav.Item onClick={() => setShow1(true)}>טופס להגשת עסק</Nav.Item>
              <Nav.Item onClick={() => setShow2(true)}>לשלוח הודעה</Nav.Item>
            </Nav>
          )}
        </Row>
      </Container>
    </Navbar>
  );
};

export default ButtonMenu;
