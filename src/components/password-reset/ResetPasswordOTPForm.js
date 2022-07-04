import React, { useRef, useEffect, useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import "./ResetPassForm.css";
import { useDispatch, useSelector } from "react-redux";
import { postLoginAction } from "../../pages/register-login/signInUpAction";
import { useNavigate } from "react-router-dom";
import {
  requestPassResetOTPAction,
  resetPassAction,
} from "../../pages/admin-profile/AdminProfileAction";

//aaaaA11

const initialState = {
  otp: "",
  password: "",
  confirmPassword: "",
};

export const ResetPasswordOTPForm = () => {
  const dispatch = useDispatch();
  const { passResetResponse, isLoading, passResettingEmail } = useSelector(
    (state) => state.admin
  );

  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);

  // useEffect(() => {}, []);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setError("");
    !disableBtn && setDisableBtn(true);

    setForm({
      ...form,
      [name]: value,
    });

    if (name === "confirmPassword") {
      const { password } = form;

      password !== value && setError("Passwords do not match");

      password.length < 6 &&
        setError("New Password must be at least 6 characters");

      !/[a-z]/.test(password) && setError("Password must contain lowercase");
      !/[A-Z]/.test(password) && setError("Password must contain uppercase");
      !/[0-9]/.test(password) && setError("Password must contain number");

      !form.password && setError("New Password must be provided");
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) {
      return alert("Passwords do not match");
    }
    rest.email = passResettingEmail;
    dispatch(resetPassAction(rest));
    // console.log(form);
  };

  const disableButton = () => {
    !error && setDisableBtn(false);
  };

  return (
    <Container>
      <div className="form-content mt-5 mb-5">
        <h2>Request Password!</h2>
        <hr />

        {isLoading && <Spinner variant="primary" animation="border" />}

        {passResetResponse.message && (
          <Alert
            variant={
              passResetResponse.status === "success" ? "success" : "danger"
            }
          >
            {passResetResponse.message}
          </Alert>
        )}
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>OTP</Form.Label>
            <Form.Control
              onChange={handleOnChange}
              name="otp"
              type="number"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              onChange={handleOnChange}
              name="password"
              type="password"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              onChange={handleOnChange}
              name="confirmPassword"
              type="password"
              required
              onBlur={disableButton}
            />
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
        <div className="text-end">
          Forgot password?
          <a href="/">Login Now</a>
        </div>
      </div>
    </Container>
  );
};
