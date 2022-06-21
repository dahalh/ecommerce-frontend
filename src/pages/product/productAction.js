import { toast } from "react-toastify";
import {
  deleteProducts,
  getProducts,
  postProduct,
} from "../../helpers/axiosHelpers";
import { setProducts } from "./productSlice";

export const fetchProductsAction = () => async (dispatch) => {
  const { status, products } = await getProducts();

  status === "success" && dispatch(setProducts(products));
};

export const postProductAction = (obj) => async (dispatch) => {
  const response = postProduct(obj);

  toast.promise(response, {
    pending: "Please wait ...",
  });

  const { status, message } = await response;

  toast[status](message);

  status === "success" && dispatch(fetchProductsAction());
};

export const deleteProductAction = (ids) => async (dispatch) => {
  const response = deleteProducts(ids);

  toast.promise(response, {
    pending: "Please wait ...",
  });

  const { status, message } = await response;

  toast[status](message);

  status === "success" && dispatch(fetchProductsAction());
};
