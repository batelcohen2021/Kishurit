import React from "react";
import { Row, Col } from "react-bootstrap";
import { BrowserView, MobileView } from "react-device-detect";
import BusEditCard from "./BusEditCard";

function BusEditBlock({ data }) {
  return (
    <>
      <BrowserView>
        {data?.blockList?.map((block, i) => (
          <Row key={`block${i}`} className="pb-3 pt-3">
            {block?.map((info, j) => (
              <Col key={`info${i * 3 + j}`} md={4} lg={4}>
                <BusEditCard info={info} idx={i * 3 + j} on={true} />
              </Col>
            ))}
          </Row>
        ))}
      </BrowserView>
      
      <MobileView>
        {data?.list?.map((business, i) =>
            <Row key={`info${i}`}>
              <Col className="mb-3">
                <BusEditCard info={business} idx={i} on={false}/>
              </Col>
            </Row>
          )}
      </MobileView>
    </>
  );
}

export default BusEditBlock;
