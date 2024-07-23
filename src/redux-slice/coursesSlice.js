import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, actions) => {
      const { payload } = actions;
      return [...payload];
    },
    deleteCousrse: (state, actions) => {
      const { payload } = actions;
      return state.filter((course) => course.course_id !== payload);
    },
    getMentorship: (state, actions) => {
      return actions.payload;
    },
    applyCouponCode: (state, actions) => {
      console.log(state);
      const { id, discount: price } = actions.payload;
      const updatedCoupons = state.map((item) => {
        if (item.id === id) {
          return { ...item, price: String(price) };
        }
        return item; // return the original item if no match
      });
      return updatedCoupons;
    },
  },
});

export const { setCourses, deleteCousrse, getMentorship, applyCouponCode } =
  coursesSlice.actions;

export default coursesSlice.reducer;
