import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../pages/categories/categoryAction";

export const CategoryTable = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    // call api to fetch all the cats and set in the store
    dispatch(fetchCategoriesAction());
  }, []);

  return (
    <Table striped>
      <thead>
        <tr>
          <th>#</th>
          <th>Status</th>
          <th>Name</th>
          <th>Parent ID</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((item, i) => (
          <tr>
            <td>{i + 1}</td>
            <td
              className={
                item.status === "active" ? "text-success" : "text-danger"
              }
            >
              {item.status}
            </td>
            <td>{item.catName}</td>
            <td>{item.parentCatId}</td>
            <td>
              <Button variant="warning">Edit</Button> {""}
              <Button variant="danger">Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
