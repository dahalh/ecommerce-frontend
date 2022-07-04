import axios from "axios";

const rootUrlAPI = "http://localhost:8000/api/v1";
const adminEP = rootUrlAPI + "/admin";
const catEP = rootUrlAPI + "/category";
const productEP = rootUrlAPI + "/products";

const paymentMethodEP = rootUrlAPI + "/payment-method";

// ==== admin apis ======

// @data must be an object
const apiProcessor = async ({ method, url, dataObj }) => {
  try {
    const { data } = await axios({
      method,
      url,
      data: dataObj,
    });
    return data;
  } catch (error) {
    let message = error.message;
    if (error.response && error.response.data) {
      message = error.response.data.message;
    }

    return {
      status: "error",
      message,
    };
  }
};

export const postUser = (dataObj) => {
  const url = adminEP;
  return apiProcessor({ method: "post", url, dataObj });
};

export const loginUser = (dataObj) => {
  const url = adminEP + "/login";
  return apiProcessor({ method: "post", url, dataObj });
};

export const postEmailVerification = (dataObj) => {
  const url = adminEP + "/email-verification";
  return apiProcessor({ method: "post", url, dataObj });
};

export const updateAdminUser = (dataObj) => {
  const url = adminEP;
  return apiProcessor({ method: "put", url, dataObj });
};

// request otp
export const requestPasswordResetOTP = (dataObj) => {
  const url = adminEP + "/otp-request";
  return apiProcessor({ method: "post", url, dataObj });
};

// update password
export const updateAdminPassword = (dataObj) => {
  const url = adminEP + "/password";
  return apiProcessor({ method: "patch", url, dataObj });
};

// ==== category apis ======

export const getCategories = () => {
  const url = catEP;
  return apiProcessor({ method: "get", url });
};

export const postCategories = (dataObj) => {
  const url = catEP;
  return apiProcessor({ method: "post", url, dataObj });
};

export const deleteCategory = (_id) => {
  console.log(_id);
  const url = catEP;
  return apiProcessor({ method: "delete", url, dataObj: { _id } });
};

export const updateCategory = (dataObj) => {
  const url = catEP;
  return apiProcessor({ method: "put", url, dataObj });
};

// ==== product apis ======

export const getProducts = () => {
  const url = productEP;
  return apiProcessor({ method: "get", url });
};

export const getSingleProduct = (_id) => {
  const url = productEP + "/" + _id;
  return apiProcessor({ method: "get", url });
};

export const postProduct = (dataObj) => {
  const url = productEP;
  return apiProcessor({ method: "post", url, dataObj });
};

export const deleteProducts = (dataObj) => {
  const url = productEP;
  return apiProcessor({ method: "delete", url, dataObj });
};

export const updateProduct = (dataObj) => {
  const url = productEP;
  return apiProcessor({ method: "put", url, dataObj });
};

// ==== payment methods api ======

export const getPaymentMethods = (_id) => {
  const url = _id ? paymentMethodEP + "/" + _id : paymentMethodEP;
  return apiProcessor({ method: "get", url });
};

export const postPaymentMethod = (dataObj) => {
  const url = paymentMethodEP;
  return apiProcessor({ method: "post", url, dataObj });
};

export const deletePaymentMethod = (_id) => {
  const url = paymentMethodEP + "/" + _id;
  return apiProcessor({ method: "delete", url });
};

export const updatePaymentMethod = (dataObj) => {
  const url = paymentMethodEP;
  return apiProcessor({ method: "put", url, dataObj });
};
