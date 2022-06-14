import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../system-state/systemSlice";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

export const AdminSidebar = () => {
  const dispatch = useDispatch();
  const { showAdminSidebar } = useSelector((state) => state.system);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        <i className="fa-solid fa-bars"></i>
      </Button> */}

      <Offcanvas
        show={showAdminSidebar}
        onHide={() => dispatch(toggleSidebar())}
        onClick={() => dispatch(toggleSidebar())}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Admin Side Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <hr />
          <ListGroup variant="flush" className="fs-5">
            <ListGroup.Item>
              <Link className="nav-link" to="/dashboard">
                <i class="fa-solid fa-house-chimney"></i> Home
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="nav-link" to="/dashboard">
                <i class="fa-solid fa-gauge-simple"></i> Dashboard
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="nav-link" to="/customers">
                <i class="fa-solid fa-person"></i> Customers
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="nav-link" to="/products">
                <i class="fa-solid fa-toolbox"></i> Products
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="nav-link" to="/orders">
                <i class="fa-solid fa-folder"></i> Orders
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="nav-link" to="/catalog">
                <i class="fa-solid fa-book"></i> Catalog
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="nav-link" to="/categories">
                <i class="fa-solid fa-list"></i> Categories
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="nav-link" to="/payments">
                {" "}
                <i class="fa-solid fa-credit-card"></i> Payments
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="nav-link" to="/settings">
                <i class="fa-solid fa-gear"></i> Settings
              </Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link className="nav-link" to="/">
                <i class="fa-solid fa-power-off"></i> Log Out
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
