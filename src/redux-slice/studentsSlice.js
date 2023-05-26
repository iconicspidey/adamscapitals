import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents: (state, actions) => {
      const { payload } = actions;

      return [...payload];
    },
    deleteStudent: (state, actions) => {
      const { payload } = actions;
      return state.filter((student) => student.user_id !== payload);
    },
  },
});

export const { setStudents, deleteStudent } = studentsSlice.actions;

export default studentsSlice.reducer;
