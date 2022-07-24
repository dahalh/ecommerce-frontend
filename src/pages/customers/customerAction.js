import { setCustomers } from "./customerSlice";
import { getCustomers } from "../../helpers/axiosHelpers";

export const getCustomerAction = (_id) => async (dispatch) => {
  const { status, customers } = await getCustomers(_id);

  status === "success" && customers.length && dispatch(setCustomers(customers));
};
