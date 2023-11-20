import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import axios from "axios";
import { isMobile } from "react-device-detect";

import NewBusForm from "./Components/NewBusForm";
import ContactForm from "./Components/ContactForm";
import BusBlock from "./Components/BusBlock";
import ButtonMenu from "./Components/ButtonMenu";
import WelcomeJumbotron from "./Components/WelcomeJumbatron";
import CitySelect from "./Components/CitiesSelect";
import updateDB, { dbURL, sendEmail } from "./funcs";

export default function HomePage(props) {
  const busCss = `text-center bg-light rounded ${isMobile ? "p-2" : "p-4"}`;
  const [fetchedData, setFetchedData] = useState();
  const [searchData, setSearchData] = useState();
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [city, setCity] = useState();
  const [searchText, setSearchText] = useState("");


  const handleFormData = (e, ourFormData) => {
    e.preventDefault();
    setShow1(false);
    console.log(ourFormData);
    var newData = { ...fetchedData };
    newData.list.push(ourFormData);
    updateDB (newData);
    setFetchedData((info) => {
      return newData;
    });
  };


  const fetchUrl = useCallback(() => {
    axios
      .get(dbURL, { mode: "cors" })
      .then((json) => {
        var arr = { ...json?.data?.obj };
        arr.list = arr.list.sort((a, b) => a.name.localeCompare(b.name));
        setFetchedData(arr);
        setSearchData(arr);

        // console.log(arr.list.filter (e => e.active));
      })
      .catch((err) => console.log(err));
  }, []);

  const sendEmail1 = async (e, info) => {
    await sendEmail (e, info);
    setShow2(false);
  };

  const search = () => {
    if (check1 === false && check2 === false) {
      alert("לא נבחרה אפשרות חיפוש");
      return;
    }

    var data = { ...fetchedData };
    data.list = [...data.list].filter((bus) => bus.active);

    if (check1) data.list = data.list.filter((info) => info.city === city);
    if (check2) {
      data.list = data.list.filter(
        (info) =>
          info?.name.includes(searchText) ||
          info?.comment.includes(searchText) ||
          info?.type.includes(searchText)
      );
    }

    setSearchData((prev) => data);
  };

  useEffect(() => {
    fetchUrl();
  }, [fetchUrl]);

  return (
    <>
      <ButtonMenu setShow1={setShow1} setShow2={setShow2} />
      <Container className={`mt-5 ${isMobile ? "pt-5" : "pt-2"}`}>
        {/* <h4 className="text-center title" style={{ textDecoration: "underline" }}>
          עצמאיים ונותני שרות בזמן מלחמה
        </h4>

        <p className={busCss}>
          ברוכים לדף של העצמאיים, מפונים מאזורי הגבולות. כאן תוכלו למצוא מגוון בעלי עסקים שתוכלו להעזר בשרותים שלהם.
        </p> */}
        <WelcomeJumbotron />

        <Form
          className={`mt-2 border rounded mb-2 ${
            isMobile ? "p-2 pb-0 mb-3" : "p-3 pb-1 pt-2"
          }`}
        >
          <Form.Label>חיפוש</Form.Label>
          <Row>
            <Col lg={4}>
              <InputGroup className="mb-3" style={{ direction: "ltr" }}>
                <CitySelect setCity={(city) => setCity(city)} />
                <InputGroup.Checkbox
                  type="checkbox"
                  id="cityCheckbox"
                  size="sm"
                  checked={check1}
                  onChange={() => setCheck1(!check1)}
                />
              </InputGroup>
            </Col>
            <Col lg={4}>
              <InputGroup className="mb-3" style={{ direction: "ltr" }}>
                <Button size="sm" onClick={search}>
                  הגש
                </Button>
                <FormControl
                  type="text"
                  size="sm"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="חיפוש חופשי"
                />
                <InputGroup.Checkbox
                  type="checkbox"
                  id="checkbox1"
                  size="sm"
                  checked={check2}
                  onChange={() => setCheck2(!check2)}
                />
              </InputGroup>
            </Col>
          </Row>
        </Form>

        <BusBlock data={searchData} />
        <Modal show={show1} onHide={() => setShow1(false)}>
          <Modal.Header closeButton>
            <Modal.Title>טופס הגשת עסק</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-2">
            <NewBusForm handleFormData={handleFormData} />
          </Modal.Body>
        </Modal>
        <Modal show={show2} onHide={() => setShow2(false)}>
          <Modal.Header closeButton>
            <Modal.Title>שליחת הודעה למערכת</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-2">
            <ContactForm handleFormData={sendEmail1} />
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}
