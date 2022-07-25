import React from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const OrderEditForm = () => {
  const { orders } = useSelector((state) => state.orders);

  const { _id } = useParams();

  const selectedOrder = orders.filter((order) => order._id === _id);
  console.log(selectedOrder);

  if (selectedOrder.length < 1) {
    return (
      <h1>Order not found, Please go back and refresh the order list page.</h1>
    );
  }

  const order = selectedOrder[0];
  const { buyer, cart, paymentInfo, status, totalAmount } = order;
  console.log(order);

  return (
    <div>
      <div className="fw-bold py-2 d-flex justify-content-between">
        <div>Status: {status}</div>
        <div>
          <Form className="d-flex">
            <Form.Group>
              <Form.Select>
                <option value="">--- select ---</option>
                <option value="shipped">Shipped</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary">Mark As</Button>
          </Form>
        </div>
      </div>
      <div className="shippingInfo border p-2 mb-2">
        <h4>Buyer Info</h4>
        <hr />
        Order Data: 20-10-2022 <br />
        Name: {buyer.fName} {buyer.lName} <br />
        Phone: {buyer.phone} <br />
        Email: {buyer.email} <br />
        Shipping Address: {buyer.address}
      </div>
      <div className="payment-details border p-2 mb-2">
        <h4>Payment Details</h4>
        <hr />
        Status: {paymentInfo.status} <br />
        Total: {paymentInfo.paidAmount} <br />
        Paid Date: {paymentInfo.paidDate} <br />
        Paid Method: {paymentInfo.method} <br />
        Transaction ID: {paymentInfo.transactionID} <br />
      </div>
      <div className="order-details border p-2 mb-2">
        <h4>Cart Details</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Thumbnail</th>
              <th>Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {[cart].map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <img src={item.thumbnail} width="80px" />
                </td>
                <td>{item.productName}</td>
                <td>{item.salePrice}</td>
                <td>{item.qty}</td>
                <td>{item.subTotal}</td>
              </tr>
            ))}
            <tr className="fw-bold">
              <td colSpan={5}>Total</td>
              <td>{totalAmount}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="note-box border p-2 mb-2">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Add Notes</Form.Label>
            <Form.Control as="textarea" placeholder="Add note" rows="5" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check label="Send email to the customer" />
          </Form.Group>

          <Button variant="primary">Submit</Button>
        </Form>
      </div>
      <div className="note-history mt-5">
        <div className="h5">Comments</div>
        <div className="message">
          <div className="mt-3">
            Date: 10-03-2022
            <div className="border p-2 mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
              error facere ipsa odit nam, rem libero provident eius.
              Voluptatibus, modi.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
