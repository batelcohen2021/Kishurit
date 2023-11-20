import React, { useState } from "react";
import {
  Button,
  ButtonToolbar,
  Card,
  Col,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import CitiesSelect from "./CitiesSelect";

const BusEditCard = ({ info, idx, setData, deleteItem }) => {
  const [formData, setFormData] = useState({ ...info });

  const Label = (props) => (
    <Form.Label {...props} className={`${props.className} mb-1`}></Form.Label>
  );

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    var val = name === "active" ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleData = () => {
    var newFormData = { ...formData };
    for (const key in newFormData) {
      if (newFormData[key] === "") delete newFormData[key];
    }
    if (newFormData?.active) newFormData.active = false;
    setData(newFormData, idx);
  };

  const handleSubmit = (e) => {
    const name = e.nativeEvent.submitter.name;
    e.preventDefault();
    if (name === "submit") handleData();
    else if (name === "delete") deleteItem(idx);
  };

  return (
    <Card bg="light">
      <Card.Body>
        <Card.Title className="text-center">
          <span
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            {formData.title}
          </span>
          <span
            className="text-right"
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              float: "right",
            }}
          >
            {idx}
          </span>
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
            {/* <Form.Control
              size="sm"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            /> */}
            <CitiesSelect
              city={info?.city}
              setCity={(city) => {
                setFormData((prev) => {
                  return { ...prev, city: city };
                });
              }}
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
              onKeyDown={(e) => {
                if (e.keyCode == 13)
                  setFormData({
                    ...formData,
                    tags: [...formData?.tags, e.target.value],
                  });
              }}
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

          <ButtonToolbar
            className="mt-3 mb-1 gap-2"
            aria-label="Toolbar with Button groups"
          >
            <Button size="sm" variant="primary" name="submit" type="submit">
              להגיש
            </Button>
            <Button size="sm" variant="danger" name="delete" type="submit">
              למחוק
            </Button>

            <InputGroup style={{ direction: "ltr" }}>
              <InputGroup.Text>
                {formData.active ? "פעיל" : "מושבת"}
              </InputGroup.Text>
              <InputGroup.Checkbox
                name="active"
                checked={formData.active}
                onChange={handleChange}
              />
            </InputGroup>
          </ButtonToolbar>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BusEditCard;
