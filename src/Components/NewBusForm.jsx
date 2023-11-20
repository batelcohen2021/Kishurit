import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CitiesSelect from "./CitiesSelect";
import { Typeahead } from "react-bootstrap-typeahead";

function NewBusForm({ handleFormData }) {
  const [formData, setFormData] = useState({
    // name: '',
    // title: '',
    // city: '',
    // type: '',
    // tel1: '',
    name: "מני בן חמו",
    title: "דובר עירייה",
    city: "נוף של הגליל",
    type: "דובר העירייה",
    tel1: "0506113690",
    tel2: "",
    whatsapp: "",
    website1: "",
    tags: [],
    comment: "",
    active: false,
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

      <Form.Group controlId="formProfession" className="mt-1 mb-1">
        <Label>
          מקצוע/תחום עיסוק
          <label className="astrix" />
        </Label>
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
        <Label>
          טלפון1
          <label className="astrix" />
        </Label>
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
              options={formData.tags}
              placeholder="תוסיף תגיות"
              onChange={(values) => setFormData({ ...formData, tags: values })}
              onKeyDown={(e) => {
                console.log (e.target.value);
                if (e.keyCode === 13)
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

      <Button variant="primary" type="submit">
        להגיש
      </Button>
    </Form>
  );
}

export default NewBusForm;
