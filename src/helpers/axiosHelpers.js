import axios from "axios";

const rootUrlAPI = "http://localhost:8000/api/v1";
const adminEP = rootUrlAPI + "/admin";

export const postUser = async (usrObj) => {
  try {
    const { data } = await axios.post(adminEP, usrObj);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const loginUser = async (usrObj) => {
  try {
    const { data } = await axios.post(adminEP + "/login", usrObj);
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

export const postEmailVerification = async (obj) => {
  try {
    const { data } = await axios.post(adminEP + "/email-verification", obj);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};
