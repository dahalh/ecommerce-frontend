import {
  requestPasswordResetOTP,
  updateAdminPassword,
  updateAdminUser,
} from "../../helpers/axiosHelpers";
import {
  setPassResetResponse,
  setUser,
  setIsLoading,
  setPassResettingEmail,
} from "./AdminProfileSlice";
import { toast } from "react-toastify";

export const updateAdminProfileAction = (obj) => async (dispatch) => {
  const promiseResponse = updateAdminUser(obj);
  toast.promise(promiseResponse, { pending: "Please wait..." });

  const { status, message, user } = await promiseResponse;

  toast[status](message);

  status === "success" && dispatch(setUser(user));
};

export const requestPassResetOTPAction = (obj) => async (dispatch) => {
  dispatch(setIsLoading(true));
  const response = await requestPasswordResetOTP(obj);
  dispatch(setPassResettingEmail(obj.email));
  dispatch(setPassResetResponse(response));
};

export const resetPassAction = (obj) => async (dispatch) => {
  const responsePromise = updateAdminPassword(obj);

  toast.promise(responsePromise, {
    pending: "Please wait...",
  });

  const { status, message } = await responsePromise;

  toast[status](message);
};
