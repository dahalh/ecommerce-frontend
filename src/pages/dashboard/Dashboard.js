import React from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CustomCard } from "../../components/custom-card/CustomCard";
import { CustomTable } from "../../components/custom-table/CustomTable";
import AdminLayout from "../layouts/AdminLayout";
import { fetchProductsAction } from "../product/productAction";

const Dashboard = () => {
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  useEffect(() => {
    !products.length && dispatch(fetchProductsAction());
  }, []);

  // client info
  const clientHeader = ["fName", "lName", "Joined Date"];
  const clientInfo = [
    {
      fName: "Himanshu",
      lName: "Dahal",
      joinedAt: "20/10/2020",
    },
    {
      fName: "John",
      lName: "Doe",
      joinedAt: "20/10/2020",
    },
    {
      fName: "Jane",
      lName: "Doe",
      joinedAt: "20/10/2020",
    },
  ];

  // order info
  const tableHeader = ["Status", "Name", "Order Date", "Order Total"];
  const tableData = [
    {
      status: "Processing",
      fName: "Sam",
      orderDate: "10-10-2022",
      orderTotal: 567,
    },
    {
      status: "Processing",
      fName: "Himanshu",
      orderDate: "10-08-2022",
      orderTotal: 200,
    },
    {
      status: "Payment Pending",
      fName: "John",
      orderDate: "10-07-2022",
      orderTotal: 700,
    },
    {
      status: "Processing",
      fName: "Jane",
      orderDate: "10-10-2022",
      orderTotal: 867,
    },
  ];

  const activeProduct = products.filter(
    (product) => product.status === "active"
  );
  const inactiveProduct = products.filter(
    (product) => product.status === "inactive"
  );

  return (
    <AdminLayout>
      <h5 className="py-3">Dashboard</h5>
      <div className="products">
        <h5>Product Summary</h5>
        <hr />
        <Row className="g-3">
          <Col md="4">
            <CustomCard title="Total Products" count={products.length} />
          </Col>
          <Col md="4">
            <CustomCard title="Active Products" count={activeProduct.length} />
          </Col>
          <Col md="4">
            <CustomCard
              title="Inactive Products"
              count={inactiveProduct.length}
            />
          </Col>
        </Row>
      </div>

      <div className="user-info mt-5"></div>
      <h5>Client Summary</h5>
      <hr />
      <CustomTable tableHeader={clientHeader} tableData={clientInfo} />

      <div className="last-orders">
        <h5>Last 5 Orders</h5>
        <hr />
        <CustomTable tableHeader={tableHeader} tableData={tableData} />
      </div>
      <div className="top-selling"></div>
    </AdminLayout>
  );
};

export default Dashboard;
