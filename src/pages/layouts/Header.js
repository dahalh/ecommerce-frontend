import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { toggleSidebar } from "../../system-state/systemSlice";

export const Header = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.admin);
  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Container>
        {user._id && (
          <Button variant="primary" onClick={() => dispatch(toggleSidebar())}>
            <i className="fa-solid fa-bars"></i>
          </Button>
        )}
        {/* <Button variant="primary" onClick={() => dispatch(toggleSidebar())}>
          <i className="fa-solid fa-bars"></i>
        </Button> */}
        <LinkContainer to="/">
          <Navbar.Brand>My Store Admin</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user._id ? (
              <>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
                <Link to="/" className="nav-link">
                  Login
                </Link>
              </>
            ) : (
              <i className="fa-solid fa-bell"></i>
            )}

            {/* <Link to="/register" className="nav-link">
              Register
            </Link>
            <Link to="/" className="nav-link">
              Login
            </Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
