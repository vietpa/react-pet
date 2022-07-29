import { configureStore } from "@reduxjs/toolkit";
import loginStatusReducer from "../slices/loginStatusSlice";

const rootReducer: any = {
  loginStatus: loginStatusReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;