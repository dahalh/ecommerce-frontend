import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CustomInput } from "../../components/custom-input/CustomInput";
import AdminLayout from "../layouts/AdminLayout";
import {
  updateAdminProfileAction,
  updatePassAction,
} from "./AdminProfileAction";

// const passInitialState = {
//   currentPassword: "",
//   password: "",
//   confirmPassword: "",
// };

const AdminProfile = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [passUpdateForm, setPassUpdateForm] = useState({});
  const [error, setError] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);

  const { user } = useSelector((state) => state.admin);

  useEffect(() => {
    setForm(user);
  }, [user]);

  // profile update
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { createdAt, emailValidationCode, updatedAt, __v, status, ...rest } =
      form;
    dispatch(updateAdminProfileAction(rest));
  };

  const inputField = [
    {
      label: "First Name",
      name: "fName",
      type: "text",
      value: form.fName,
      required: true,
    },
    {
      label: "Last Name",
      name: "lName",
      type: "text",
      value: form.lName,
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "text",
      value: form.email,
      required: true,
      disabled: true,
    },

    {
      label: "Phone",
      name: "phone",
      type: "text",
      value: form.phone,
    },
    {
      label: "Address",
      name: "address",
      type: "text",
      value: form.address,
    },
    {
      label: "DOB",
      name: "dob",
      type: "date",
      value: form.dob ? form.dob.subStr(0, 10) : undefined,
    },
    {
      label: "Current Password",
      name: "password",
      type: "password",
      required: true,
    },
  ];

  // password update

  const handleOnPasswordChange = (e) => {
    const { name, value } = e.target;

    if (name === "password" || name === "confirmPassword") {
      setError("");
      !disableBtn && setDisableBtn(true);
    }

    setPassUpdateForm({
      ...passUpdateForm,
      [name]: value,
    });

    if (name === "confirmPassword") {
      const { password } = passUpdateForm;

      password !== value && setError("Passwords do not match");

      password.length < 6 &&
        setError("New Password must be at least 6 characters");

      !/[a-z]/.test(password) && setError("Password must contain lowercase");
      !/[A-Z]/.test(password) && setError("Password must contain uppercase");
      !/[0-9]/.test(password) && setError("Password must contain number");

      !passUpdateForm.password && setError("New Password must be provided");
    }
  };

  const handleOnPasswordSubmit = (e) => {
    e.preventDefault();

    const { confirmPassword, password } = passUpdateForm;
    if (confirmPassword !== password) {
      return alert("Passwords do not match");
    }

    const obj = {
      password,
      email: user.email,
      currentPassword: passUpdateForm.currentPassword,
    };
    console.log(obj);
    //1111Aa

    dispatch(updatePassAction(obj));
  };

  const disableButton = () => {
    !error && setDisableBtn(false);
  };

  const resetPassFields = [
    {
      label: "Current Password",
      name: "currentPassword",
      type: "password",
      value: passUpdateForm.currentPassword,
      required: true,
    },
    {
      label: "New Password",
      name: "password",
      type: "password",
      value: passUpdateForm.password,
      required: true,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      value: passUpdateForm.confirmPassword,
      required: true,
      onBlur: disableButton,
    },
  ];

  return (
    <AdminLayout>
      <div className="update-info mt-5">
        <h3>Your profile</h3>
        <Form onSubmit={handleOnSubmit}>
          {inputField.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          ))}
          <Button type="submit">Update Profile</Button>
        </Form>
      </div>
      <hr />
      <div className="update-password mb-3">
        <h3>Update Password</h3>
        <Form onSubmit={handleOnPasswordSubmit}>
          {resetPassFields.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnPasswordChange} />
          ))}
          <Form.Group className="mb-3">
            <Form.Text>
              Password must contain Upper Case, Lower Case, Number and at least
              6 characters long
            </Form.Text>
          </Form.Group>
          <Form.Text className="text-danger fw-bold mb-3">{error}</Form.Text>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Button type="submit" disabled={disableBtn}>
              Update Password
            </Button>
          </Form.Group>
        </Form>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
