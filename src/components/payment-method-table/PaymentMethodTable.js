import { useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePaymentMethodAction,
  editPaymentMethodAction,
  fetchPaymentMethods,
} from "../../pages/payment-method/paymentMethodAction";
import { EditPaymentMethodForm } from "../payment-method-form/EditPaymentMethodForm";
import { PaymentMethodForm } from "../payment-method-form/PaymentMethodForm";

export const PaymentMethodTable = ({ showForm, setShowForm }) => {
  const dispatch = useDispatch();
  // const [showForm, setShowForm] = useState(true);

  const { paymentMethods } = useSelector((state) => state.paymentMethod);

  useEffect(() => {
    dispatch(fetchPaymentMethods());
  }, []);

  const handleOnEditForm = (_id) => {
    setShowForm(false);
    dispatch(editPaymentMethodAction(_id));
  };

  return (
    <div className="">
      {showForm ? <PaymentMethodForm /> : <EditPaymentMethodForm />}
      <div className="mb-2">{paymentMethods.length} Payment methods found!</div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods.length > 0 &&
            paymentMethods.map(({ _id, name, status, description }, i) => (
              <tr key={_id}>
                <td>{i + 1}</td>
                <td
                  className={
                    status === "active" ? "text-success" : "text-danger"
                  }
                >
                  {status}
                </td>
                <td>
                  {name}{" "}
                  <i
                    className="fa-solid fa-circle-info text-primary"
                    title={description}
                  ></i>{" "}
                </td>
                <td>
                  <Button
                    variant="warning"
                    title="Edit"
                    onClick={() => handleOnEditForm(_id)}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Button>{" "}
                  <Button
                    variant="danger"
                    title="Delete"
                    onClick={() =>
                      window.confirm(
                        "Are you sure you want to delete this payment method?"
                      ) && dispatch(deletePaymentMethodAction(_id))
                    }
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};
