import { setRatings } from "./ratingSlice";
import { getRatings } from "../../helpers/axiosHelpers";

export const getRatingAction = (_id) => async (dispatch) => {
  const { status, ratings } = await getRatings(_id);

  status === "success" && ratings.length && dispatch(setRatings(ratings));
};
