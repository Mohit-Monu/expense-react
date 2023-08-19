import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const config = {
  method: "GET",
  url: `https://e-commerce-ed719-default-rtdb.firebaseio.com/expenses.json`,
  headers: {
    "Content-Type": "application/json",
  },
};
const res = await axios(config);
const fetchedExpenses = [];
for (const key in res.data) {
  fetchedExpenses.push({
    id: key,
    amount: res.data[key].amount,
    category: res.data[key].category,
    description: res.data[key].description,
  });
}
const initialexpenses = { expenses: fetchedExpenses,editExpense:null };
const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialexpenses,
  reducers: {
    addExpense (state, action) {
      state.expenses=[action.payload,...state.expenses]
      state.editExpense=null
    },
    delExpense(state, action) {
      state.expenses = state.expenses.filter((item)=>item.id!==action.payload)
      state.editExpense=null
    },
    editExpense(state, action) {
      state.editExpenses=state.expenses.filter((item)=>item.id===action.payload)
      state.expenses = state.expenses.filter((item)=>item.id!==action.payload)
    },
  },
});
export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;
