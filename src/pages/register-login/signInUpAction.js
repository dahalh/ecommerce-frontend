import {
  postUser,
  loginUser,
  getAdminUser,
  requestNewAccessJWT,
} from "../../helpers/axiosHelpers";
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
    sessionStorage.setItem("accessJWT", data.accessJWT);
    localStorage.setItem("refreshJWT", data.refreshJWT);
    dispatch(setUser(data.user));
  }

  data.status === "error" && toast[data.status](data.message);
  dispatch(responseResolved(data));
};

const fetchUser = (accessJWT) => async (dispatch) => {
  const response = await getAdminUser();
  response.user && dispatch(setUser(response.user));
};

export const authoAdminLogin = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");

  if (accessJWT) {
    dispatch(fetchUser());
    return;
  } else if (refreshJWT) {
    const token = await requestNewAccessJWT();
    token ? dispatch(fetchUser()) : dispatch(adminLogout());
  } else {
    dispatch(adminLogout());
  }
  // if accessJWT exists, fetch user and mount user in our state
  // else
  // if refreshJWT exists, fetch new accessJWT and fetch the user
};

export const adminLogout = () => (dispatch) => {
  sessionStorage.removeItem("accessJWT");
  localStorage.removeItem("refreshJWT");
  dispatch(setUser({}));
};
