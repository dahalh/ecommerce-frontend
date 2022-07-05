import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../pages/categories/categoryAction";
import { postProductAction } from "../../pages/product/productAction";
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

export const ProductForm = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const [form, setForm] = useState(initialState);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, []);

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;

    if (name === "status") value = checked ? "active" : "inactive";

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnImageSelect = (e) => {
    const { files } = e.target;
    console.log(files);
    setImages(files);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    const formData = new FormData();

    for (const key in form) {
      // console.log(key, form[key])
      formData.append(key, form[key]);
    }

    images.length && [...images].map((img) => formData.append("images", img));

    dispatch(postProductAction(formData));
  };

  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Product Name",
      required: true,
    },
    {
      name: "sku",
      label: "Sku",
      type: "text",
      placeholder: "Product unique text",
      required: true,
    },
    {
      name: "qty",
      label: "Qty",
      type: "number",
      placeholder: "100",
      required: true,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "100",
    },
    {
      name: "salesPrice",
      label: "Sales Price",
      type: "number",
      placeholder: "80",
    },
    {
      name: "salesStartDate",
      label: "Sales Start Date",
      type: "date",
    },
    {
      name: "salesEndDate",
      label: "Sales End Date",
      type: "date",
    },
    {
      name: "description",
      as: "textarea",
      rows: "5",
      required: true,
    },
    {
      name: "images",
      type: "file",
      multiple: true,
      accept: "imge/*",
      required: true,
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
                <option key={item._id} value={item._id}>
                  {item.catName}
                </option>
              )
          )}
        </Form.Select>
      </Form.Group>

      {inputFields.map((item, i) => (
        <CustomInput
          key={i}
          {...item}
          onChange={
            item.name === "images" ? handleOnImageSelect : handleOnChange
          }
        />
      ))}

      <Button className="mb-3" variant="primary" type="submit">
        Add Product
      </Button>
    </Form>
  );
};

export default ProductForm;
