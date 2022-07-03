import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updatePaymentMethodAction } from "../../pages/payment-method/paymentMethodAction";
import { CustomInput } from "../custom-input/CustomInput";
import { MyVerticallyCenteredModal } from "../modal/Modal";

const initialState = {
  status: "inactive",
  name: "",
  description: "",
};

export const EditPaymentMethodForm = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState(initialState);
  const { selectedPaymentMethods } = useSelector(
    (state) => state.paymentMethod
  );

  useEffect(() => {
    setForm(selectedPaymentMethods);
  }, [selectedPaymentMethods]);

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;

    if (name === "status") {
      value = checked ? "active" : "inactive";
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { createdAt, updatedAt, __v, ...rest } = form;
    console.log(rest);

    dispatch(updatePaymentMethodAction(form));
  };

  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      value: form.name,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      as: "textarea",
      required: true,
      value: form.description,
    },
  ];
  return (
    <MyVerticallyCenteredModal title="Update Payment Method">
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            name="status"
            label="Status"
            onChange={handleOnChange}
            checked={form.status === "active"}
          />
        </Form.Group>
        {inputFields.map((item, i) => (
          <CustomInput key={i} {...item} onChange={handleOnChange} />
        ))}
        <Form.Group className="mb-3">
          <Button variant="success" type="submit">
            Update Payment Method
          </Button>
        </Form.Group>
      </Form>
    </MyVerticallyCenteredModal>
  );
};
