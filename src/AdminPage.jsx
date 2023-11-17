import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import axios from "axios";
import { isMobile } from "react-device-detect";
import { Octokit } from '@octokit/rest';
import { createOrUpdateTextFile } from "@octokit/plugin-create-or-update-text-file";

import BusEditBlock from "./Components/BusEditBlock";
import ButtonEditMenu from "./Components/ButtonEditMenu";

export default function AdminPage(props) {
  // const busCss = `text-center bg-light rounded ${isMobile ? 'p-2' : 'p-4'}`

  //const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vSOMBWH8riSN_sATvwimeLBxgIL4JbV6qPg9QOJIkuzyZ5zmUFb0Pd7qHmI0TIiS5SgVW5hW13MHDv6/pub?output=csv`;
  const url1 =
    "https://raw.githubusercontent.com/romanbr87/romanbr87/main/avoda.json";
  const url2 =
    "https://raw.githubusercontent.com/romanbr87/romanbr87/main/Avoda2.json";
  const [data1, setData1] = useState();
  const [data2, setData2] = useState();

  const MyOctokit = Octokit.plugin(createOrUpdateTextFile);
  const octokit = new MyOctokit({
    //auth: "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",
    auth: "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"
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
    // setShow1(false);
    // console.log(ourFormData);
    // var newData = { ...data };
    // newData.list.push(ourFormData);
    // update(newData);
    // setData((info) => {
    //   return newData;
    // });
  };

  const update = async (info, file) => {
    info = JSON.stringify({ obj: info }, null, 2);
    console.log(info);
    const { updated } = await octokit.createOrUpdateTextFile({
      owner: "romanbr87",
      repo: "romanbr87",
      path: file,
      content: info,
      message: "updated file",
    });

    if (updated) {
      console.log("The data was update");
    } else {
      console.log("The file doesn't not exist");
    }
  };

  const fetchUrl = (state, url) => {
    axios
      .get(url, { mode: "cors" })
      .then((json) => {
        console.log(json.data);
        var arr = { ...json?.data?.obj };
        arr.blockList = divideArrayBySetsOfN(arr.list);

        state(arr);

        console.log(arr);
      })
      .catch((err) => console.log(err));
  };

  const Title = (props) => {
    return (
      <Row className={props.className}>
        <Col>
          <h1
            className="text-center title display-7"
            style={{ fontWeight: "bold", textDecoration: "underline" }}
          >
            {props.children}
          </h1>
        </Col>
      </Row>
    );
  };

  useEffect(() => {
    console.clear();
    fetchUrl(setData1, url1);
    fetchUrl(setData2, url2);

    var n = 6;
    console.log(`[${Math.floor(n / 3)}][${n % 3}]`);
  }, []);

  return (
    <>
      <ButtonEditMenu update1={(e) => update(data1, "avoda.json")} />
      <Container className={`mt-5 ${isMobile ? "pt-5" : "pt-2"}`}>
      {/* <linearGradient
      colors={['#000000', '#ffffff']}
    />
      <radialGradient
      colors={['#000000', '#ffffff']}
    /> */}

        <Title className={`${isMobile ? "mb-3" : "mb-2"}`}>עסקים ישנים</Title>
        <BusEditBlock data={data1} />
        <hr />
        <Title className={`${isMobile ? "mb-3" : "mb-2 mt-2"}`}>
          עסקים חדשים
        </Title>
        <BusEditBlock data={data2} />
      </Container>
    </>
  );
}
