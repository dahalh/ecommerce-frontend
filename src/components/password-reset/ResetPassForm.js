import React, { useRef, useEffect } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import "./ResetPassForm.css";
import { useDispatch, useSelector } from "react-redux";
import { postLoginAction } from "../../pages/register-login/signInUpAction";
import { useNavigate } from "react-router-dom";
import { requestPassResetOTPAction } from "../../pages/admin-profile/AdminProfileAction";

export const ResetPassForm = () => {
  const dispatch = useDispatch();
  const { passResetResponse, isLoading } = useSelector((state) => state.admin);

  const emailRef = useRef();

  // useEffect(() => {}, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    console.log(email);
    dispatch(requestPassResetOTPAction({ email }));
  };

  return (
    <Container>
      <div className="form-content mt-5 mb-5">
        <h2>Request Your Password Change!</h2>
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
            <Form.Label>Email address</Form.Label>
            <Form.Control
              ref={emailRef}
              name="email"
              type="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Button type="submit">Request OTP</Button>
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
