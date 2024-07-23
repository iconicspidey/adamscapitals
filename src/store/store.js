import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "../redux-slice/userSlice";
import coursesSlice from "../redux-slice/coursesSlice";
import studentsSlice from "../redux-slice/studentsSlice";
import flashSaleslice from "../redux-slice/flashSaleslice";
import priceSlice from "../redux-slice/priceSlice";
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
    sale: flashSaleslice,
    price: priceSlice,
  },
});
export const persistor = persistStore(store);
export default store;
