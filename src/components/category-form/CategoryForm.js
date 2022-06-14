import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export const CategoryForm = () => {
  const initialState = {
    parentCat: "",
    catName: "",
  };

  const [form, setForm] = useState(initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <Form onSubmit={handleOnSubmit} className="py-5">
      <Row className="g-3">
        <Col md="5">
          <Form.Group controlId="formGridState">
            <Form.Select
              onChange={handleOnChange}
              name="parentCat"
              defaultValue="Choose..."
            >
              <option value="">... Select Parent Category ...</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md="4">
          <Form.Control
            onChange={handleOnChange}
            name="catName"
            placeholder="Category Name"
            required
          />
        </Col>
        <Col md="3">
          <Button type="submit">Add Category</Button>
        </Col>
      </Row>
    </Form>
  );
};
