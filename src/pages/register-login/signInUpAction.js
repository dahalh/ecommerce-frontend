import { postUser, loginUser } from "../../helpers/axiosHelpers";
import { isPending, responseResolved } from "./signInUpSlice";
import { toast } from "react-toastify";
import { setUser } from "../../pages/admin-profile/AdminProfileSlice";

export const postUserAction = (user) => async (dispatch) => {
  dispatch(isPending());

  console.log(user);
  // call axios helper to call api

  const promiseData = postUser(user);
  // console.log(data);

  toast.promise(promiseData, {
    pending: "Please wait...",
  });

  const data = await promiseData;

  toast[data.status](data.message);
  dispatch(responseResolved(data));
};

export const postLoginAction = (user) => async (dispatch) => {
  dispatch(isPending());
  // call axios helper to call api

  const promiseData = loginUser(user);
  // console.log(data);

  toast.promise(promiseData, {
    pending: "Please wait...",
  });

  const data = await promiseData;

  if (data.status === "success") {
    console.log(data.user);
    dispatch(setUser(data.user));
    return;
  }

  data.status === "error" && toast[data.status](data.message);
  dispatch(responseResolved(data));
};
