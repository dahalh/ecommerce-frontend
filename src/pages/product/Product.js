import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { ProductTable } from "../../components/product-table/ProductTable";

const Product = () => {
  return (
    <AdminLayout>
      <h2 className="mt-3">Products</h2>
      <div className="text-end">
        <Link to="/product/new">
          <Button variant="primary">
            <i class="fa-solid fa-plus"></i> Add new product
          </Button>
        </Link>
      </div>
      <hr />
      <div className="product-list">
        <ProductTable />
      </div>
    </AdminLayout>
  );
};

export default Product;
