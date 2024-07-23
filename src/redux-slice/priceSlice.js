import { createSlice } from "@reduxjs/toolkit";

const initialState = { small: 125, big: 350 };

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    discount: (state, actions) => {
      return { ...state, small: 70 };
    },
  },
});

export const { discount } = priceSlice.actions;

export default priceSlice.reducer;
