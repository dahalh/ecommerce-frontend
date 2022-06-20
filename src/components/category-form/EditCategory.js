import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  postCategoryAction,
  updateCategoryAction,
} from "../../pages/categories/categoryAction";
import { MyVerticallyCenteredModal } from "../modal/Modal";

const initialState = {
  status: "inactive",
  parentCatId: "",
  catName: "",
};
export const EditCategory = ({ selectedCat }) => {
  //   console.log(selectedCat);

  const dispatch = useDispatch();
  const [form, setForm] = useState(selectedCat);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    setForm(selectedCat);
  }, [selectedCat]);

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

    const { parentCatId, catName, status, _id } = form;
    // dispatch action to update the category
    dispatch(
      updateCategoryAction({
        _id,
        parentCatId,
        catName,
        status,
      })
    );
  };

  //   console.log(form);
  return (
    <MyVerticallyCenteredModal>
      <Form onSubmit={handleOnSubmit} className="py-5">
        <Row className="g-3">
          <Col md="2">
            <Form.Check
              onChange={handleOnChange}
              name="status"
              type="switch"
              id="custom-switch"
              label="Status"
              checked={form.status === "active"}
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
                      <option
                        key={item._id}
                        value={item._id}
                        selected={item._id === form.parentCatId}
                      >
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
              value={form.catName}
              required
            />
          </Col>
          <Col md="3">
            <Button type="submit">Update Category</Button>
          </Col>
        </Row>
      </Form>
      {/* new */}
    </MyVerticallyCenteredModal>
  );
};
