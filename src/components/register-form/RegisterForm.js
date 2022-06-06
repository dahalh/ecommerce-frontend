import React, { useState } from "react";
import { Alert, Button, Container, Form, Spinner } from "react-bootstrap";
import "./registerForm.css";
import { useDispatch, useSelector } from "react-redux";
import { postUserAction } from "../../pages/register-login/signInUpAction";

const initialState = {
  fName: "Himanshu",
  lName: "Dahal",
  phone: "0412345678",
  email: "h@d.com",
  password: "123456",
  confirmPassword: "123456",
};

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(false);

  // pull data from redux store
  const { isLoading, response } = useSelector((state) => state.signInUp);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError(true);
    }
    setError(false);
    console.log(form);

    const { confirmPassword, ...rest } = form;
    // we dispatch the action to the reducer

    dispatch(postUserAction(rest));

    // console.log(form);
  };

  return (
    <Container>
      <div className="form-content mt-5 mb-5">
        <h1>Registration Form</h1>
        <hr />
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="fName"
              value={form.fName}
              placeholder="Sam"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="lName"
              value={form.lName}
              placeholder="Smith"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="phone"
              value={form.phone}
              placeholder="0412345678"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>DOB</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="dob"
              type="date"
              placeholder="2020-10-10"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="address"
              placeholder="10 George St. Sydney"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="email"
              value={form.email}
              type="email"
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="password"
              type="password"
              value={form.password}
              placeholder="Password"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              placeholder="Password"
              required
            />
            <Alert variant="danger" show={error}>
              Passwords do no match!
            </Alert>
          </Form.Group>

          {/* <Form.Group>
            {response.message && (
              <Alert
                variant={response.status === "success" ? "success" : "danger"}
              >
                {response.message}
              </Alert>
            )}
          </Form.Group> */}

          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Button type="submit">
              {isLoading ? (
                <Spinner variant="danger" animation="border" size="sm" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </Form.Group>
        </Form>
        <div className="text-end">
          Already have account? <a href="/">Login Here</a>
        </div>
      </div>
    </Container>
  );
};
