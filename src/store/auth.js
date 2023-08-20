import { createSlice } from "@reduxjs/toolkit";

let local = false;
let localemail=null
if (localStorage.getItem("email") != null) {
  localemail = localStorage.getItem("email")
  local = true;
}
const initialAuthState = { isAuthenticated: local,email:localemail };
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state,action) {
      state.isAuthenticated = true;
      state.email=action.payload
    },
    logout(state,action) {
      state.isAuthenticated = false;
      state.email=null
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
