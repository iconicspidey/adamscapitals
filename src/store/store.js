import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux-slice/userSlice";
import coursesSlice from "../redux-slice/coursesSlice";
import studentsSlice from "../redux-slice/studentsSlice";
const store = configureStore({
  reducer: {
    user: userSlice,
    courses: coursesSlice,
    students: studentsSlice,
  },
});

export default store;
