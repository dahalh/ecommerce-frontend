import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { OrderEditForm } from "../../components/order-edit/OrderEditForm";
import AdminLayout from "../layouts/AdminLayout";
import { getOrderAction } from "./orderAction";

const OrderDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderAction());
  }, []);

  return (
    <AdminLayout>
      <div className="mt-3">
        <Link to="/orders" className="text-decoration-none text-secondary">
          &lt; Back
        </Link>
      </div>

      <h4 className="py-3">Order Details</h4>
      <OrderEditForm />
    </AdminLayout>
  );
};

export default OrderDetails;
