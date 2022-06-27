import React from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import EditProductForm from "../../components/product-form/EditProductForm";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchSingleProductAction } from "./productAction";

const EditProduct = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();

  useEffect(() => {
    _id && dispatch(fetchSingleProductAction(_id));
  }, []);

  return (
    <AdminLayout>
      <div className="mt-3 mb-3">
        <Link to="/products">
          <Button variant="none">
            <i className="fa-solid fa-arrow-left"></i> Back
          </Button>
        </Link>
      </div>
      <h2 className="mt-3">Edit Product</h2>
      <hr />
      <div>
        <EditProductForm />
      </div>
    </AdminLayout>
  );
};

export default EditProduct;
