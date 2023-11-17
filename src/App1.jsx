import React, { useCallback, useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import axios, { isCancel, AxiosError } from "axios";
// import { Octokit } from '@octokit/rest';
import { isMobile } from "react-device-detect";
import { Octokit } from "@octokit/rest";
import { createOrUpdateTextFile } from "@octokit/plugin-create-or-update-text-file";

import NewBusForm from "./Components/NewBusForm";
import ContactForm from "./Components/ContactForm";
import BusBlock from "./Components/BusBlock";
import ButtonMenu from "./Components/ButtonMenu";
import WelcomeJumbotron from "./Components/WelcomeJumbatron";

export default function App(props) {
  const busCss = `text-center bg-light rounded ${isMobile ? "p-2" : "p-4"}`;
  //const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vSOMBWH8riSN_sATvwimeLBxgIL4JbV6qPg9QOJIkuzyZ5zmUFb0Pd7qHmI0TIiS5SgVW5hW13MHDv6/pub?output=csv`;
  //const url = "https://raw.githubusercontent.com/romanbr87/romanbr87/main/avoda.json";
  const url =
    "https://raw.githubusercontent.com/romanbr87/romanbr87/main/Avoda2.json";
  const [data, setData] = useState();
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [formData, setFormData] = useState();

  const MyOctokit = Octokit.plugin(createOrUpdateTextFile);
  const octokit = new MyOctokit({
    auth: "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",
  });

  function divideArrayBySetsOfN(array, n = 3) {
    return array.reduce((arr, curr, i) => {
      if (i % n === 0) arr.push([]);
      arr[arr.length - 1].push(curr);
      return arr;
    }, []);
  }

  const handleFormData = (e, ourFormData) => {
    e.preventDefault();
    setShow1(false);
    console.log(ourFormData);
    var newData = { ...data };
    newData.list.push(ourFormData);
    update(newData);
    setData((info) => {
      return newData;
    });
  };

  const update = async (info) => {
    info = JSON.stringify({ obj: info }, null, 2);
    console.log(info);
    const { updated } = await octokit.createOrUpdateTextFile({
      owner: "romanbr87",
      repo: "romanbr87",
      path: "avoda1.json",
      content: info,
      message: "updated file",
    });

    if (updated) {
      console.log("The data was update via %s", data.commit.html_url);
    } else {
      console.log("The file doesn't not exist");
    }
  };

  const fetchUrl = useCallback(() => {
    axios
      .get(url, { mode: "cors" })
      .then((json) => {
        console.log(json.data);
        var arr = { ...json?.data?.obj };
        arr.blockList = divideArrayBySetsOfN(arr.list);

        setData(arr);

        console.log(arr);
      })
      .catch((err) => console.log(err));

    // fetch(url)
    //   .then(response => response.text())
    //   .then(blob => {
    //     const reader = new FileReader();
    //     reader.onload = () => console.log(reader.result);
    //     reader.readAsDataURL(blob);
    //   });
  }, []);

  const sendEmail = async (e, info) => {
    console.clear();
    e.preventDefault();
    let apiKey =
      "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";
    let apiUrl = "https://api.brevo.com/v3/smtp/email";

    const tel =
      info?.phone && `tel: <a href=\"tel:${info.phone}\">${info.phone}</a> \n`;

    let msg = {
      sender: { name: info.name, email: info?.email || "avoda@wall.com" },
      to: [{ email: "drushimgalil@gmail.com", name: "Avoda" }],
      subject: info?.title || "Messame",
      textContent: tel + info.comment,
    };

    axios.post(apiUrl, msg, {
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
    });
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
        <BusBlock data={data} />

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
            <ContactForm handleFormData={sendEmail} />
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}
