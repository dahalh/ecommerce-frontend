import axios from "axios";

const rootUrlAPI = "http://localhost:8000/api/v1";
const adminEP = rootUrlAPI + "/admin";
const catEP = rootUrlAPI + "/category";
const productEP = rootUrlAPI + "/products";

const paymentMethodEP = rootUrlAPI + "/payment-method";

// ==== admin apis ======

// @data must be an object
const apiProcessor = async ({ method, url, dataObj, headers }) => {
  try {
    const { data } = await axios({
      method,
      url,
      data: dataObj,
      headers,
    });
    return data;
  } catch (error) {
    let message = error.message;
    console.log(error);

    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem("accessJWT");
      localStorage.removeItem("refreshJWT");
      return { status: "error", message: "Unauthenticated" };
    }

    if (error.response && error.response.data) {
      message = error.response.data.message;
    }

    if (message === "jwt expired!") {
      // call the api to get new refreshTWT and recall the apiProcessor itself

      const accessJWT = await requestNewAccessJWT();

      if (accessJWT) {
        sessionStorage.setItem("accessJWT", accessJWT);
        return apiProcessor({
          method,
          url,
          dataObj,
          headers: {
            Authorization: accessJWT,
          },
        });
      }

      return;
    }

    return {
      status: "error",
      message,
    };
  }
};

export const requestNewAccessJWT = async () => {
  const { accessJWT } = await apiProcessor({
    method: "get",
    url: adminEP + "/accessjwt",
    headers: {
      Authorization: localStorage.getItem("refreshJWT"),
    },
  });
  sessionStorage.setItem("accessJWT", accessJWT);
  return accessJWT;
};

export const getAdminUser = () => {
  const url = adminEP;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const postUser = (dataObj) => {
  const url = adminEP;
  return apiProcessor({
    method: "post",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
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
  return apiProcessor({
    method: "patch",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

// update password from profile
export const updateAdminPasswordFromProfile = (dataObj) => {
  const url = adminEP + "/update-password";
  return apiProcessor({ method: "patch", url, dataObj });
};

// ==== category apis ======

export const getCategories = () => {
  const url = catEP;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const postCategories = (dataObj) => {
  const url = catEP;
  return apiProcessor({
    method: "post",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const deleteCategory = (_id) => {
  console.log(_id);
  const url = catEP;
  return apiProcessor({
    method: "delete",
    url,
    dataObj: { _id },
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const updateCategory = (dataObj) => {
  const url = catEP;
  return apiProcessor({
    method: "put",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

// ==== product apis ======

export const getProducts = () => {
  const url = productEP;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const getSingleProduct = (_id) => {
  const url = productEP + "/" + _id;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const postProduct = (dataObj) => {
  const url = productEP;
  return apiProcessor({
    method: "post",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const deleteProducts = (dataObj) => {
  const url = productEP;
  return apiProcessor({
    method: "delete",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const updateProduct = (dataObj) => {
  const url = productEP;
  return apiProcessor({
    method: "put",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

// ==== payment methods api ======

export const getPaymentMethods = (_id) => {
  const url = _id ? paymentMethodEP + "/" + _id : paymentMethodEP;
  return apiProcessor({
    method: "get",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const postPaymentMethod = (dataObj) => {
  const url = paymentMethodEP;
  return apiProcessor({
    method: "post",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const deletePaymentMethod = (_id) => {
  const url = paymentMethodEP + "/" + _id;
  return apiProcessor({
    method: "delete",
    url,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};

export const updatePaymentMethod = (dataObj) => {
  const url = paymentMethodEP;
  return apiProcessor({
    method: "put",
    url,
    dataObj,
    headers: {
      Authorization: sessionStorage.getItem("accessJWT"),
    },
  });
};
