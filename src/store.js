import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "./components/pages/register/RegisterSlice";
import LoginSlice from "./components/pages/login/LoginSlice";

const store = configureStore({
  reducer: {
    register: RegisterSlice,
    login: LoginSlice,
  },
});

export default store;
