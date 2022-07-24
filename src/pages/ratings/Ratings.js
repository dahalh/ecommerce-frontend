import React from "react";
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CustomTable } from "../../components/custom-table/CustomTable";
import AdminLayout from "../layouts/AdminLayout";
import { getRatingAction } from "./ratingAction";

const Ratings = () => {
  const dispatch = useDispatch();

  const { ratings } = useSelector((state) => state.ratings);

  useEffect(() => {
    dispatch(getRatingAction());
  }, []);

  return (
    <AdminLayout>
      <h3 className="py-3">Ratings</h3>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            {/* <th>Rating ID</th> */}
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Review By</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((rating, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              {/* <td>{rating._id}</td> */}
              <td>{rating.productId}</td>
              <td> {rating.productName}</td>
              <td>{rating.rating}</td>
              <td>{rating.review}</td>
              <td>{rating.reviewedBy}</td>
              <td>
                <Button variant="warning">Edit</Button> {""}
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  );
};

export default Ratings;
