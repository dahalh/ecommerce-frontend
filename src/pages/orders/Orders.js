import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PaginationBasic } from "../../components/pagination/Pagination";

import AdminLayout from "../layouts/AdminLayout";
import { getOrderAction } from "./orderAction";

const productPerPage = 10;

const Orders = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.orders);

  const [displayOrder, setDisplayOrder] = useState([]);
  const [active, setActive] = useState(1);

  // useEffect(() => {
  //   if (!orders.length) {
  //     dispatch(getOrderAction());
  //   }
  //   setDisplayOrder(orders);
  // }, [orders]);

  // const handleOnChange = (e) => {
  //   const { value } = e.target;
  //   if (!value) {
  //     return setDisplayOrder(orders);
  //   }
  //   const filteredArg = orders.filter((item) => item.status);
  //   setDisplayOrder(filteredArg);
  // };

  useEffect(() => {
    !displayOrder.length && dispatch(getOrderAction());
    orders.length && setDisplayOrder(orders);
    // dispatch(getOrderAction());
  }, [orders]);

  const handleOnFilter = (e) => {
    const { value } = e.target;
    setActive(1);
    if (!value) {
      setDisplayOrder(orders);
    } else {
      setDisplayOrder(orders.filter((item) => item.status === value));
    }
  };

  // pagination logic
  const handleOnPaginationClick = (page) => {
    setActive(page);
  };

  const pages = Math.ceil(displayOrder.length / productPerPage);
  const productStartAt = (active - 1) * productPerPage;
  const productEndAt = productStartAt + 10;

  return (
    <AdminLayout>
      <h4 className="py-3">Order management</h4>
      <div className="d-flex justify-content-between mb-2">
        <div>{displayOrder.length} orders found!</div>
        <div>
          <Form className="d-flex">
            <Form.Group>
              <Form.Select onChange={handleOnFilter}>
                <option value="">--- Filter ---</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Buyer Name</th>
            <th>Order Total</th>
            <th>Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {displayOrder.map(
            (item, i) =>
              i >= productStartAt &&
              i < productEndAt && (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.status}</td>
                  <td>{item.buyer.fName}</td>
                  <td>{item.totalAmount}</td>
                  <td>{item.paymentInfo.status}</td>
                  <td>
                    <Link to={`/orders/${item._id}`}> Info </Link>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </Table>
      <PaginationBasic
        pages={pages}
        active={active}
        handleOnPaginationClick={handleOnPaginationClick}
      />
    </AdminLayout>
  );
};

export default Orders;
