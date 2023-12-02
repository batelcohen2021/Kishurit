import React from "react";
import { Row, Col } from "react-bootstrap";
import { BrowserView, MobileView } from "react-device-detect";
import { divideArrayBySetsOfN } from "../funcs";
import useCities from "../hooks/useCities";
import BusCard from "./BusCard";

function BusBlock({ data }) {
  const { cities } = useCities();
  const ourCities = cities?.filter((city) =>
    data?.list?.some((item) => (item.city === city) && item.active )
  );

  const ourData = ourCities?.map((city) => {
    const list = data?.list?.filter(
      (item) => item.city === city && item.active
    );
    const blockList = divideArrayBySetsOfN(list);
    return { city, list, blockList };
  });

  // const list = data?.list?.filter((item) => item.active);
  // const blockList = divideArrayBySetsOfN(list);

  // console.log(ourData);

  return (
    <>
      {ourData?.map((info, i) => (
        <React.Fragment key={`card${i}`}>
          <span
            className="fw-bold text-decoration-underline mb-0 pb-0"
            style={{ fontSize: "30px", marginBottom: "1px", paddingBottom: "1px" }}
          >
            {info.city}
          </span>
          <BrowserView>
            {info.blockList?.map((block, i) => (
              <Row key={`block${i}`} className="pb-1 pt-3">
                {block?.map((info, j) => (
                  <Col key={`info${i * 3 + j}`} md={4} lg={4}>
                    <BusCard info={info} />
                  </Col>
                ))}
              </Row>
            ))}
          </BrowserView>

          <MobileView>
            {info.list?.map((business, i) => (
              <Row key={`info${i}`} className="pt-2">
                <Col className="mb-3">
                  <BusCard info={business} />
                </Col>
              </Row>
            ))}
          </MobileView>
        </React.Fragment>
      ))}
    </>
  );
}

export default BusBlock;
