import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function NewBusForm({ handleFormData }) {
  const [formData, setFormData] = useState({
    // title: '',
    // name: '',
    // phone: '',
    // email: '',
    // comment: '',

    title: 'לשנות בבקשה את הדף שלי',
    name: 'מני',
    phone: '0507113699',
    email: 'romanbr87@gmail.com',
    comment: 'sdfsdasdasdasd',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    var newFormData = {...formData};
    for (const key in newFormData) {
      if (newFormData[key] === '') delete newFormData[key];
    }
    
    handleFormData(e, newFormData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitle" className="mb-1">
        <Form.Label>כותרת</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="formName" className="mt-1 mb-1">
        <Form.Label>איש קשר<label className="astrix"/></Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPhone" className="mt-1 mb-1">
        <Form.Label>טלפון</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="leftDirection"
        />
      </Form.Group>

      <Form.Group controlId="formEmail" className="mt-1 mb-2">
        <Form.Label>אימייל</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="leftDirection"
        />
      </Form.Group>

      <Form.Group controlId="formComment" className="mt-1 mb-2">
        <Form.Label>הערות<label className="astrix"/></Form.Label>
        <Form.Control
          size="sm"
          as="textarea"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          rows={5}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        להגיש
      </Button>
    </Form>
  );
}

export default NewBusForm;
