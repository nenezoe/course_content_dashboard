import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import ImageUploader from "../../components/ImageUploader";

function CourseSection() {
  const [sections, setSections] = useState([{ topic: "" }]);

  const addItem = () => {
    setSections([...sections, { topic: "" }]);
  };

  const handleTopicChange = (index) => (event) => {
    const newSections = [...sections];
    newSections[index].topic = event.target.value;
    setSections(newSections);

    console.log(sections);
  };

  return (
    <div>
      <h4 className="text-primary mt-5">Section </h4>
      <div className="bg-primary p-4 border-default rounded-4 row">
        <Form.Group className="mb-3 col-8" controlId="formBasicEmail">
          <Form.Label>Topic </Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            className="border-default bg-white"
            key={index}
            onChange={(e) => {
              handleTopicChange(index);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ fontWeight: "bold", width: "100%" }}>
            <Alert key={"warning"} variant={"warning"}>
              Upload 1 Image
            </Alert>
          </Form.Label>
          <Form.Label>Image for Section </Form.Label>
          <div className="bg-white p-3">
            <ImageUploader />
          </div>
        </Form.Group>
      </div>
    </div>
  );
}

export default CourseSection;
