import React from "react";
import { Button, Form, Alert } from "react-bootstrap";

function QuizSection() {
  return (
    <div className="mb-5">
      <div className="bg-primary p-4 border-default rounded-4 row">
        <Form.Group className="mb-3 col-12" controlId="formBasicEmail">
          <Form.Label>Question </Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            className="border-default bg-white"
          />
        </Form.Group>

        <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
          <Form.Label>Options </Form.Label>
          <Form.Control
            type="text"
            placeholder="Option 1"
            className="border-default bg-white mb-3"
          />
          <Form.Control
            type="text"
            placeholder="Option 2"
            className="border-default bg-white mb-3"
          />
          <Form.Control
            type="text"
            placeholder="Option 3"
            className="border-default bg-white mb-3"
          />
          <Form.Control
            type="text"
            placeholder="Option 4"
            className="border-default bg-white"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <div className="col-10 mt-4 d-flex justify-content-between">
            <Form.Text className="text-black">The Correct Answer is :</Form.Text>
            <Button size="" className="btn btn-default">
              Option 1
            </Button>
            <Button size="" className="btn btn-default">
              Option 2
            </Button>
            <Button size="" className="btn btn-default">
              Option 3
            </Button>
            <Button size="" className="btn btn-default">
              Option 4
            </Button>
          </div>
        </Form.Group>
      </div>
    </div>
  );
}

export default QuizSection;
