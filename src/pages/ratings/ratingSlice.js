import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ratings: [],
};

const ratingSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {
    setRatings: (state, { payload }) => {
      state.ratings = payload;
    },
  },
});

const { reducer, actions } = ratingSlice;

export const { setRatings } = actions;

export default reducer;
