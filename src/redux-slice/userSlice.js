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
      localStorage.clear("user");
    });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
