import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "../redux-slice/userSlice";
import coursesSlice from "../redux-slice/coursesSlice";
import studentsSlice from "../redux-slice/studentsSlice";
const persistConfig = {
  key: "root",
  storage,
};
const persist = persistReducer(persistConfig, userSlice);
const store = configureStore({
  reducer: {
    user: persist,
    courses: coursesSlice,
    students: studentsSlice,
  },
});
export const persistor = persistStore(store);
export default store;
