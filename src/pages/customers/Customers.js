import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PaginationBasic } from "../../components/pagination/Pagination";
import AdminLayout from "../layouts/AdminLayout";
import { getCustomerAction } from "./customerAction";

const customerPerPage = 3;

const Customers = () => {
  const dispatch = useDispatch();

  const { customers } = useSelector((state) => state.customers);

  const [active, setActive] = useState(1);
  const [displayCust, setDisplayCust] = useState([]);

  useEffect(() => {
    // call api to fetch all the customers and set in the store
    !displayCust.length && dispatch(getCustomerAction());
    customers.length && setDisplayCust(customers);

    // dispatch(getCustomerAction());
  }, [customers]);

  // pagination logic
  const handleOnPaginationClick = (page) => {
    setActive(page);
  };

  const pages = Math.ceil(customers.length / customerPerPage);
  const customerStartAt = (active - 1) * customerPerPage;
  const customerEndAt = customerStartAt + 3;

  const handleRealTimeSearch = (e) => {
    const { value } = e.target;

    setDisplayCust(
      customers.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  // console.log(customers);
  // console.log("display", displayCust);
  return (
    <AdminLayout>
      <h4 className="py-3">Customer management</h4>
      <Form.Control
        name="search"
        placeholder="Search..."
        className="mb-3"
        onChange={handleRealTimeSearch}
      ></Form.Control>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayCust.map(
            (item, i) =>
              i >= customerStartAt &&
              i < customerEndAt && (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <Button variant="link"> Info </Button>
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

export default Customers;
