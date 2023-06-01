import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      const { payload } = actions;
      return {
        ...state,
        ...payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase("logout", (state, actions) => {
      state = {};
      localStorage.clear("token");
    });
    builder.addCase("localstorage", (state, actions) => {
      const user = JSON.parse(localStorage.getItem("token"));
      if (user) {
        return { ...user };
      }
      return {};
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
