import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { isMobile } from "react-device-detect";

function BusCard({ info }) {
  const whatsappURL = isMobile ? "whatsapp://" : "https://web.whatsapp.com/";

  const Text = (props) => (
    <Card.Text style={{ margin: "3px 0" }} {...props}></Card.Text>
  );
  const Span = (props) => (
    <span className="ms-1" style={{ fontWeight: "bold" }} {...props}></span>
  );

  return (
    <Card border="primary">
      <Card.Header>
        <Card.Title className="text-center" style={{ fontWeight: "bold" }}>
          {info.title}
        </Card.Title>
      </Card.Header>
      <Card.Body className="bg-light ps-3 pe-3 pt-1 pb-1 mb-2">
        <Text>
          <Span>איש קשר:</Span> {info.name}
        </Text>

        <Text>
          <Span>עיר:</Span> {info.city}
        </Text>

        <Text>
          <Span>טלפון:</Span> <a href={`tel:${info.tel1}`}>{info.tel1}</a>
        </Text>

        {info.tel2 && (
          <Text>
            <Span>טלפון:</Span> <a href={`tel:${info.tel2}`}>{info.tel2}</a>
          </Text>
        )}
        {info.whatsapp && (
          <Text>
            <Span>ווטסאפ:</Span>
            <a href={`${whatsappURL}send?phone=+972${info.whatsapp}`}>{info.whatsapp}</a>
          </Text>
        )}
        {info.website1 && (
          <Text><Span>אתר:</Span>
            <a href={info.website1}>אתר</a>
          </Text>
        )}
        {info.comment && (
          <Text>
            <Span> הערות:</Span>
            {info.comment}
          </Text>
        )}
      </Card.Body>
    </Card>
  );
}

export default BusCard;
