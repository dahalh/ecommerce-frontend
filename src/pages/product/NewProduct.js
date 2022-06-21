import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { ProductForm } from "../../components/product-form/ProductForm";

const NewProduct = () => {
  return (
    <AdminLayout>
      <div className="mt-3 mb-3">
        <Link to="/products">
          <Button variant="none">
            <i className="fa-solid fa-arrow-left"></i> Back
          </Button>
        </Link>
      </div>
      <h2 className="mt-3">Add New Product</h2>
      <hr />
      <div>
        <ProductForm />
      </div>
    </AdminLayout>
  );
};

export default NewProduct;
