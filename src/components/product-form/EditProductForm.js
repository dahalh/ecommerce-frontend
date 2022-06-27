import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../pages/categories/categoryAction";
import {
  postProductAction,
  updateProductAction,
} from "../../pages/product/productAction";
import { CustomInput } from "../custom-input/CustomInput";

const initialState = {
  catId: null,
  name: "dsdsds",
  description: "dsdsddsdsdds dsdsd",
  price: 10,
  qty: 70,
  salesEndDate: null,
  salesPrice: 0,
  salesStartDate: null,
  sku: "e11",
  status: "inactive",
};

export const EditProductForm = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { selectedProduct } = useSelector((state) => state.products);
  // console.log(selectedProduct);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
    setForm(selectedProduct);
  }, [selectedProduct]);

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;

    if (name === "status") value = checked ? "active" : "inactive";

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to update this product?"))
      return;
    console.log(form);
    const {
      __v,
      updatedAt,
      thumbnail,
      slug,
      sku,
      ratings,
      image,
      createdAt,
      ...rest
    } = form;

    rest.salesPrice = Number(rest.salesPrice) ? +rest.salesPrice : 0;
    rest.salesStartDate = rest.salesStartDate ? rest.salesStartDate : null;
    rest.salesEndDate = rest.salesEndDate ? rest.salesEndDate : null;

    dispatch(updateProductAction(rest));
  };

  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Product Name",
      required: true,
      value: form.name,
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      placeholder: "Product Name",
      required: true,
      value: form.slug,
      disabled: true,
    },
    {
      name: "sku",
      label: "Sku",
      type: "text",
      placeholder: "Product unique text",
      required: true,
      value: form.sku,
      disabled: true,
    },
    {
      name: "qty",
      label: "Qty",
      type: "number",
      placeholder: "100",
      required: true,
      value: form.qty,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "100",
      value: form.price,
    },
    {
      name: "salesPrice",
      label: "Sales Price",
      type: "number",
      placeholder: "80",
      value: form.salesPrice,
    },
    {
      name: "salesStartDate",
      label: "Sales Start Date",
      type: "date",
      value: form.salesStartDate ? form.salesStartDate.split("T")[0] : "",
    },
    {
      name: "salesEndDate",
      label: "Sales End Date",
      type: "date",
      value: form.salesEndDate ? form.salesEndDate.split("T")[0] : "",
    },
    {
      name: "description",
      as: "textarea",
      rows: "5",
      required: "true",
      value: form.description,
    },
  ];

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Check
        onChange={handleOnChange}
        name="status"
        type="switch"
        id="custom-switch"
        label="Status"
        checked={form.status === "active"}
      />

      <Form.Group controlId="formGridState">
        <Form.Select
          name="catId"
          defaultValue="Choose..."
          onChange={handleOnChange}
          required
        >
          <option value="">... Select parent category ...</option>
          {categories.map(
            (item) =>
              !item.parentCatId && (
                <option
                  key={item._id}
                  value={item._id}
                  selected={item._id === selectedProduct.catId}
                >
                  {item.catName}
                </option>
              )
          )}
        </Form.Select>
      </Form.Group>

      {inputFields.map((item, i) => (
        <CustomInput key={i} {...item} onChange={handleOnChange} />
      ))}

      <Button className="mb-3" variant="primary" type="submit">
        Add Product
      </Button>
    </Form>
  );
};

export default EditProductForm;
