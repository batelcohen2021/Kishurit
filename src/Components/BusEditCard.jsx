import React, { useRef, useState } from "react";
import { Button, Card, Form, Tags  } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

const BusEditCard = ({ info, handleFormData }) => {
  const [formData, setFormData] = useState({
    name: info.name,
    title: info.title,
    city: info.city,
    type: info.type,
    tel1: info.tel1,
    tel2: info.tel2,
    whatsapp: info.whatsapp,
    website1: info.website1,
    comment: info.comment,
    tags: info.tags,
    active: info.active,
  });

  const ref = useRef(null);

  const Label = (props) => (
    <Form.Label {...props} className={`${props.className} mb-1`}></Form.Label>
  );

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    var val = name === "active" ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var newFromData = { ...formData };
    for (const key in newFromData) {
      if (newFromData[key] === "") delete newFromData[key];
    }

    handleFormData(newFromData);
  };

  return (
    <Card bg="light">
      <Card.Body>
        <Card.Title
          className="text-center"
          style={{ fontWeight: "bold", textDecoration: "underline" }}
        >
          {formData.title}
        </Card.Title>
        <Form onSubmit={handleSubmit}>
          <Label className="astrix">=ערך שחובה להכניס</Label>
          <Form.Group controlId="formTitle" className="mb-1">
            <Label className="astrix">שם עסק</Label>
            <Form.Control
              size="sm"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formName" className="mt-1 mb-1">
            <Label className="astrix">איש קשר</Label>
            <Form.Control
              size="sm"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCity" className="mt-1 mb-1">
            <Label className="astrix">יישוב/עיר</Label>
            <Form.Control
              size="sm"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formProfession" className="mt-1 mb-1">
            <Label className="astrix">מקצוע/תחום עיסוק</Label>
            <Form.Control
              size="sm"
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formTel1" className="mt-1 mb-1">
            <Label className="astrix">טלפון1</Label>
            <Form.Control
              size="sm"
              type="text"
              name="tel1"
              value={formData.tel1}
              onChange={handleChange}
              required
              className="leftDirection"
            />
          </Form.Group>

          <Form.Group controlId="formTel2" className="mt-1 mb-1">
            <Label>טלפון2</Label>
            <Form.Control
              size="sm"
              type="text"
              name="tel2"
              value={formData.tel2}
              onChange={handleChange}
              className="leftDirection"
            />
          </Form.Group>

          <Form.Group controlId="formWhatsApp" className="mt-1 mb-1">
            <Label>ווטסאפ</Label>
            <Form.Control
              size="sm"
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="leftDirection"
            />
          </Form.Group>

          <Form.Group controlId="formWebsite1" className="mt-1 mb-1">
            <Label>אתר אינטרנט של העסק</Label>
            <Form.Control
              size="sm"
              type="text"
              name="website1"
              value={formData.website1}
              onChange={handleChange}
              className="leftDirection"
            />
          </Form.Group>

          <Form.Group controlId="formTags" className="mt-1 mb-2">
            <Label>תגיות</Label>
            <Typeahead
              defaultSelected={formData.tags}
              id="tags"
              name="tags"
              labelKey="tags"
              multiple
              options={formData?.tags || []}
              placeholder="תוסיף תגיות"
              onChange={(values) => setFormData({ ...formData, tags: values })}
            />
          </Form.Group>

          <Form.Group controlId="formComment" className="mt-1 mb-2">
            <Label>הערות</Label>
            <Form.Control
              size="sm"
              as="textarea"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows={5}
            />

            {/* <Form.Control
              as="textarea"
              name="Comment"
              value={formData.Comment}
              onChange={handleChange}
            /> */}
          </Form.Group>

          <Button size="sm" className="mt-2" variant="primary" type="submit">
            להגיש
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BusEditCard;
