import { createSlice } from "@reduxjs/toolkit";

const initialState = { status: true };

const flashSaleSlice = createSlice({
  name: "flashsale",
  initialState,
  reducers: {
    stopSale: (state, actions) => {
      return { status: false };
    },
  },
});

export const { stopSale } = flashSaleSlice.actions;

export default flashSaleSlice.reducer;
