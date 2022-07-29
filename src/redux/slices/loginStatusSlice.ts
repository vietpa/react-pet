import { createSlice } from "@reduxjs/toolkit";

const loginStatusSlice = createSlice({
  name: "loginStatus",
  initialState: false,
  reducers: {
    // action login
    login: (state: any, action: any) => {
      return state = true;
    },
    logout: (state: any, action: any) => {
      //action logout
      return state = false;
    },
  },
});

const { actions, reducer } = loginStatusSlice;
export const { login, logout } = actions;
export default reducer;
