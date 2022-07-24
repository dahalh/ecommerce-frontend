import React from "react";
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CustomTable } from "../../components/custom-table/CustomTable";
import AdminLayout from "../layouts/AdminLayout";
import { getOrderAction } from "./orderAction";

const Orders = () => {
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrderAction());
  }, []);

  return (
    <AdminLayout>
      <h4 className="py-3">Customer management</h4>

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
          {orders.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{item.status}</td>
              <td>{item.buyer.fName}</td>
              <td>{item.totalAmount}</td>
              <td>{item.paymentInfo.status}</td>
              <td>
                <Button variant="link"> Info </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  );
};

export default Orders;
