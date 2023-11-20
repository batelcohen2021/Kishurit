import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import axios from "axios";
import { isMobile } from "react-device-detect";

import BusEditBlock from "./Components/BusEditBlock";
import ButtonEditMenu from "./Components/ButtonEditMenu";
import { dbURL } from "./funcs";

export default function AdminPage(props) {

  const [data, setData] = useState();

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
  const setNewData = (data, idx) => {
    setData((prev) => {
      var currList = [...prev?.list];
      currList[idx] = data;

      console.log(currList);
      prev.list = currList;
      return prev;
    });
  };

  useEffect(() => {
    fetchUrl(setData, dbURL);
  }, []);

  return (
    <>
      <ButtonEditMenu info={data}  />
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
          setData={setNewData}
          deleteItem={deleteItem}
        />
      </Container>
    </>
  );
}
