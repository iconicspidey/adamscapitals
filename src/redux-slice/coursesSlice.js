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
  },
});

export const { setCourses, deleteCousrse } = coursesSlice.actions;

export default coursesSlice.reducer;
