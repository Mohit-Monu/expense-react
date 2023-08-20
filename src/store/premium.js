import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { theme: "light",isPremium:false };
const premiumSlice = createSlice({
  name: "premium",
  initialState: initialAuthState,
  reducers: {
    PremiumMaker(state){
      state.isPremium=true
    },
    theme(state){
      state.theme = state.theme === "light" ? "dark" : "light";
    }
  },
});
export const premiumActions = premiumSlice.actions;
export default premiumSlice.reducer;
