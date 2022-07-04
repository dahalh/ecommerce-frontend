import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  passResetResponse: {},
  isLoading: false,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setPassResetResponse: (state, { payload }) => {
      state.passResetResponse = payload;
      state.isLoading = false;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const { setUser, setPassResetResponse, setIsLoading } = actions;

export default reducer;
