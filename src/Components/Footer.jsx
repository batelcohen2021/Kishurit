import { isBrowser } from "react-device-detect";
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from "react-redux";
import useOnline from '../hooks/useOnline'
import UseWindowSize from "../hooks/useWindowSize"

import { BsWifi, BsWifiOff } from "react-icons/bs";
import useWindowSize from "../hooks/useWindowSize";

export default function Footer() {
    const data = useSelector((state) => state.data.total)
    const { isOnline } = useOnline();
    const WifiIcon = () => isOnline ? <BsWifi/> : <BsWifiOff/>;
    const { width } = useWindowSize();

    return (
    <Container fluid>
    <Row className="fixed-bottom bg-light">
    <Col> 
        { isBrowser ? <><h5 style={{marginRight: '1em'}}><WifiIcon/> {data} רשומות </h5> </> :
        <h3 style={{marginRight: '1em'}}><WifiIcon/> {data} רשומות </h3> }
    </Col>
    </Row>
    </Container>
    )
}
