import React from "react";
import { Row, Col } from "react-bootstrap";
import { BrowserView, MobileView } from "react-device-detect";
import { divideArrayBySetsOfN } from "../funcs";
import BusEditCard from "./BusEditCard";

function BusEditBlock({ data, setData, deleteItem }) {
  const list = data?.list;
  const blockList = divideArrayBySetsOfN(list);

  return (
    <>
      <BrowserView>
        {blockList?.map((block, i) => (
          <Row key={`block${i}`} className="pb-3 pt-3">
            {block?.map((info, j) => (
              <Col key={`info[${i}][${j}]`} md={4} lg={4}>
                <BusEditCard
                  info={info}
                  idx={i * 3 + j}
                  setData={setData}
                  deleteItem={deleteItem}
                />
              </Col>
            ))}
          </Row>
        ))}
      </BrowserView>

      <MobileView>
        {list?.map((business, i) => (
          <Row key={`info${i}`}>
            <Col className="mb-3">
              <BusEditCard
                info={business}
                idx={i}
                setData={setData}
                deleteItem={deleteItem}
              />
            </Col>
          </Row>
        ))}
      </MobileView>
    </>
  );
}

export default BusEditBlock;
