import React, { useRef, useEffect } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import "./loginForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  postLoginAction,
  postUserAction,
} from "../../pages/register-login/signInUpAction";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

// const initialState = {
//   email: "h@d.com",
//   password: "123456",
// };

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const origin =
    (location.state && location.state.from.pathname) || "/dashboard";

  // pull data from redux store
  const { isLoading } = useSelector((state) => state.signInUp);
  const { user } = useSelector((state) => state.admin);

  const emailRef = useRef();
  const passRef = useRef();

  useEffect(() => {
    user._id && navigate(origin);
  }, [user._id]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passRef.current.value;

    if (!email || !password) {
      return alert("Both input fields must be filled");
    }

    // call api, through action
    dispatch(postLoginAction({ email, password }));
  };

  return (
    <Container>
      <div className="form-content mt-5 mb-5">
        <h1>Welcome Back!</h1>
        <hr />
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
            <Form.Label>Password</Form.Label>
            <Form.Control
              ref={passRef}
              name="password"
              type="password"
              placeholder="Password"
              defaultValue="bbbbB11"
              required
            />
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
                "Sign In"
              )}
            </Button>
          </Form.Group>
        </Form>
        <div className="text-end">
          Forgot password? <a href="/forget-password">Reset Password</a>
        </div>
      </div>
    </Container>
  );
};
