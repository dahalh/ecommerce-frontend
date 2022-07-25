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
  thumbnail: "",
  images: [],
};

export const EditProductForm = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { selectedProduct } = useSelector((state) => state.products);
  const [form, setForm] = useState(initialState);
  const [newImages, setImages] = useState([]);
  const [imgToDelete, setImgToDelete] = useState([]);

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

  const handleOnImageSelect = (e) => {
    const { files } = e.target;
    setImages(files);
  };

  const handleOnImageDelete = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setImgToDelete([...imgToDelete, value]);
    } else {
      setImgToDelete(imgToDelete.filter((imgPath) => imgPath !== value));
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to update this product?"))
      return;
    const { __v, updatedAt, slug, sku, ratings, createdAt, ...rest } = form;

    rest.salesPrice = Number(rest.salesPrice) ? +rest.salesPrice : 0;
    rest.salesStartDate = rest.salesStartDate ? rest.salesStartDate : null;
    rest.salesEndDate = rest.salesEndDate ? rest.salesEndDate : null;

    // bundle in formData
    const formData = new FormData();

    for (const key in rest) {
      formData.append(key, rest[key]);
    }

    newImages.length &&
      [...newImages].map((img) => formData.append("newImages", img));

    formData.append("imgToDelete", imgToDelete);

    dispatch(updateProductAction(formData));
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
      required: true,
      value: form.description,
    },
    {
      name: "images",
      type: "file",
      multiple: true,
      accept: "imge/*",
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
        <CustomInput
          key={i}
          {...item}
          onChange={
            item.name === "images" ? handleOnImageSelect : handleOnChange
          }
        />
      ))}

      <hr />
      <div className="d-flex my-2">
        {selectedProduct.images &&
          selectedProduct.images.length > 0 &&
          selectedProduct.images.map((imgLink) => (
            <div className="img p-2">
              <Form.Check
                type="radio"
                label="Use as thumbnail"
                name="thumbnail"
                onChange={handleOnChange}
                value={imgLink}
                checked={imgLink === form.thumbnail}
              ></Form.Check>
              <img
                key={imgLink}
                src={process.env.REACT_APP_IMAGE_SERVER_URL + imgLink.substr(6)}
                alt="product"
                width="200px"
                crossOrigin="anonymous"
                className="img-thumbnail"
              />
              <Form.Check
                label="Delete"
                value={imgLink}
                onChange={handleOnImageDelete}
              ></Form.Check>
            </div>
          ))}
      </div>

      <Button className="mb-3" variant="warning" type="submit">
        Edit Product
      </Button>
    </Form>
  );
};

export default EditProductForm;
