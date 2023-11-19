import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CitiesSelect from "./CitiesSelect";

function NewBusForm({ handleFormData }) {
  const [formData, setFormData] = useState({
    // name: '',
    // title: '',
    // city: '',
    // type: '',
    // tel: '',
    name: "מני בן חמו",
    title: "דובר עירייה",
    city: "נוף הגליל",
    tel: "0506113690",
    comment: "",
  });

  const Label = (props) => (
    <Form.Label {...props} className={`${props.className} mb-1`}></Form.Label>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    var newFormData = { ...formData };
    for (const key in newFormData) {
      if (newFormData[key] === "") delete newFormData[key];
    }

    newFormData.data = new Date();
    handleFormData(e, newFormData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        <label className="astrix" />
        =ערך שחובה להכניס
      </Label>
      <Form.Group controlId="formTitle" className="mb-1">
        <Label>
          שם עסק
          <label className="astrix" />
        </Label>
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
        <Label>
          איש קשר
          <label className="astrix" />
        </Label>
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
        <Label>
          יישוב/עיר
          <label className="astrix" />
        </Label>
        {/* <Form.Control
          size="sm"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        </> */}
        <CitiesSelect
          setCity={(city) => {
            setFormData((prev) => {
              return { ...prev, city: city };
            });
          }}
        />
      </Form.Group>

      <Form.Group controlId="formTel1" className="mt-1 mb-1">
        <Label>
          טלפון
          <label className="astrix" />
        </Label>
        <Form.Control
          size="sm"
          type="text"
          name="tel"
          value={formData.tel}
          onChange={handleChange}
          required
          className="leftDirection"
        />
      </Form.Group>

      <Form.Group controlId="formComment" className="mt-1 mb-2">
        <Label>הודעה</Label>
        <Form.Control
          size="sm"
          as="textarea"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          rows={5}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        להגיש
      </Button>
    </Form>
  );
}

export default NewBusForm;
