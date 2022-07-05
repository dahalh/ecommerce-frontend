import { toast } from "react-toastify";
import {
  deleteProducts,
  getProducts,
  getSingleProduct,
  postProduct,
  updateProduct,
} from "../../helpers/axiosHelpers";
import { setProducts, setSelectedProduct } from "./productSlice";

export const fetchProductsAction = () => async (dispatch) => {
  const { status, products } = await getProducts();

  status === "success" && dispatch(setProducts(products));
};
export const fetchSingleProductAction = (_id) => async (dispatch) => {
  const { status, products } = await getSingleProduct(_id);

  status === "success" && dispatch(setSelectedProduct(products));
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

export const updateProductAction = (obj) => async (dispatch) => {
  const response = updateProduct(obj);

  toast.promise(response, {
    pending: "Please wait ...",
  });

  const { status, message, result } = await response;
  console.log(status, message);

  toast[status](message);

  // status === "success" && dispatch(fetchProductsAction());
  status === "success" && dispatch(setSelectedProduct(result));
};
