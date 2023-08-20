import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expense"
import authReducer from "./auth"
import premiumReducer from "./premium"

const store = configureStore({
  reducer: { expense: expenseReducer, auth: authReducer,premium:premiumReducer },
});
export default store;