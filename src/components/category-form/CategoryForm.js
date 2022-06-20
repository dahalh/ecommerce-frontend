import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { postCategoryAction } from "../../pages/categories/categoryAction";

export const CategoryForm = () => {
  const initialState = {
    status: "inactive",
    parentCatId: "",
    catName: "",
  };

  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const { categories } = useSelector((state) => state.category);

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;

    if (name === "status") {
      value = checked ? "active" : "inactive";
    }

    console.log(checked, name, value);

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // console.log(form);
    const parentCatId = form.parentCatId ? form.parentCatId : undefined;

    dispatch(postCategoryAction({ ...form, parentCatId }));
  };

  return (
    <Form onSubmit={handleOnSubmit} className="py-5">
      <Row className="g-3">
        <Col md="2">
          <Form.Check
            onChange={handleOnChange}
            name="status"
            type="switch"
            id="custom-switch"
            label="Status"
          />
        </Col>
        <Col md="3">
          <Form.Group controlId="formGridState">
            <Form.Select
              name="parentCatId"
              defaultValue="Choose..."
              onChange={handleOnChange}
            >
              <option value="">... Select parent category ...</option>
              {categories.map(
                (item) =>
                  !item.parentCatId && (
                    <option key={item._id} value={item._id}>
                      {item.catName}
                    </option>
                  )
              )}
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
