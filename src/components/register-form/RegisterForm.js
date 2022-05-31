import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import "./registerForm.css";

export const RegisterForm = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { password, confirmPassword } = form;

    password === confirmPassword ? setError(false) : setError(true);
    // we dispatch the action to the reducer

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
              placeholder="Sam"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="lName"
              placeholder="Smith"
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
              placeholder="Password"
              required
            />
            <Alert variant="danger" show={error}>
              Passwords do no match!
            </Alert>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Button type="submit">Sign Up</Button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};
