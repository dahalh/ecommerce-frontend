import { getOrders } from "../../helpers/axiosHelpers";
import { setOrders } from "./orderSlice";

export const getOrderAction = (_id) => async (dispatch) => {
  const { status, orders } = await getOrders(_id);

  status === "success" && dispatch(setOrders(orders));
};
