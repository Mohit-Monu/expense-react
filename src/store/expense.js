import { createSlice } from "@reduxjs/toolkit";

const initialexpenses = { expenses: [],editExpenses:null};
const expensesSlice = createSlice({
  name: "expenses",
  initialState: initialexpenses,
  reducers: {
    initialExp(state,action){
      state.expenses=action.payload
    },
    addExpense (state, action) {
      state.editExpenses=null
      state.expenses=[action.payload,...state.expenses]
    },
    delExpense(state, action) {
      state.editExpenses=null
      state.expenses = state.expenses.filter((item)=>item.id!==action.payload)
    },
    editExpense(state, action) {
      state.editExpenses=state.expenses.filter((item)=>item.id===action.payload)
      state.expenses = state.expenses.filter((item)=>item.id!==action.payload)
    },
    editToNull(state){
      state.editExpenses=null
    }
  },
});
export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;
