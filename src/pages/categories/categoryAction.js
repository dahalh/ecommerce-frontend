import { getCategories } from "../../helpers/axiosHelpers";
import { setCategories } from "./categorySlice";

export const fetchCategoriesAction = () => async (dispatch) => {
  // call axios for api call

  const response = await getCategories();

  response.status === "success" && dispatch(setCategories(response.result));
};
