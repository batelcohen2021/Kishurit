import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import axios from "axios";
// import { Octokit } from '@octokit/rest';
import { isMobile } from "react-device-detect";
// import { Octokit } from "https://esm.sh/@octokit/rest";
// import { createOrUpdateTextFile } from "https://esm.sh/@octokit/plugin-create-or-update-text-file";
import { Octokit } from "@octokit/rest";
import { createOrUpdateTextFile } from "@octokit/plugin-create-or-update-text-file";

import BusEditBlock from "./Components/BusEditBlock";
import ButtonEditMenu from "./Components/ButtonEditMenu";
import { divideArrayBySetsOfN } from "./funcs";

export default function AdminPage(props) {
  // const busCss = `text-center bg-light rounded ${isMobile ? 'p-2' : 'p-4'}`

  //const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vSOMBWH8riSN_sATvwimeLBxgIL4JbV6qPg9QOJIkuzyZ5zmUFb0Pd7qHmI0TIiS5SgVW5hW13MHDv6/pub?output=csv`;
  const url =
    "https://raw.githubusercontent.com/romanbr87/romanbr87/main/avoda.json";
  const [data, setData] = useState();

  const MyOctokit = Octokit.plugin(createOrUpdateTextFile);
  const octokit = new MyOctokit({
    auth: process.env.REACT_APP_VERCEL_GOOOGLE_TOKEN
  });

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

  const update = async (e) => {
    e.preventDefault();
    const info = JSON.stringify({ obj: data }, null, 2);
    console.log(data);
    const { updated } = await octokit.createOrUpdateTextFile({
      owner: "romanbr87",
      repo: "romanbr87",
      path: "avoda.json",
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
        state(arr);
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

  const deleteItem = (idx) => {
    // setData((prev) => {
    // const newList = prev.list.filter((item, index) => index !== idx);
    // const newData = {...prev};
    // newData.list = newList
    // console.log (newList);
    // return newData;
    // });
    const updatedList = [...data.list];
    updatedList.splice(idx, 1);
    console.log(updatedList);
    setData({
      ...data,
      list: updatedList,
    });
  };
  const setOldData = (data, idx) => {
    setData((prev) => {
      var currList = [...prev?.list];
      currList[idx] = data;

      console.log(currList);
      prev.list = currList;
      return prev;
    });
  };

  useEffect(() => {
    console.clear();
    fetchUrl(setData, url);

    var n = 6;
    console.log(`[${Math.floor(n / 3)}][${n % 3}]`);
  }, []);

  return (
    <>
      <ButtonEditMenu update={update} />
      <Container className={`mt-5 ${isMobile ? "pt-2" : "pt-2"}`}>
        {/* <linearGradient
      colors={['#000000', '#ffffff']}
    />
      <radialGradient
      colors={['#000000', '#ffffff']}
    /> */}

        <Title className={`${isMobile ? "mb-3" : "mb-2"}`}>עסקים לעריכה</Title>
        <BusEditBlock
          data={data}
          setData={setOldData}
          deleteItem={deleteItem}
        />
      </Container>
    </>
  );
}
