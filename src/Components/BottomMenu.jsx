import React, { useEffect, useState } from "react";
import { Row, Nav, Container, Navbar } from "react-bootstrap";
import useOnline from "../hooks/useOnline";
import { CiWifiOn, CiWifiOff } from "react-icons/ci";

const ButtomMenu = () => {
  const [time, setTime] = useState(new Date());
  const { isOnline } = useOnline();

  useEffect(() => {
    // Update the time every second
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalID);
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="sm"
      fixed="bottom"
      style={{ margin: "0", padding: "0" }}
    >
      <Container fluid>
        <Row>
          <Nav>
            <Nav.Item>
              <Nav.Link>
                <span className="ps-2">{isOnline ? <CiWifiOn /> : <CiWifiOff />}</span>
                <span className="pe-2">{time.toLocaleTimeString()}</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
      </Container>
    </Navbar>
  );
};

export default ButtomMenu;
