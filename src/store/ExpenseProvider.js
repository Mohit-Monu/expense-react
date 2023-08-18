import { useCallback, useEffect, useState } from "react";
import ExpenseContext from "./Expense-context";
import axios from "axios";
const ExpenseProvider = (props) => {
  const [expenses, SetExpenses] = useState([]);
  useEffect(()=>{
    async function getexpenses() {
      try {
        SetExpenses([])
        const config = {
          method: "GET",
          url: `https://e-commerce-ed719-default-rtdb.firebaseio.com/expenses.json`,
          headers: {
            "Content-Type": "application/json",
          },
        };
        const res = await axios(config);
        for (const key in res.data) {
          const obj = {
            id: key,
            amount: res.data[key].amount,
            category: res.data[key].category,
            description: res.data[key].description,
          };
  
          SetExpenses((previtem) => {
            return [obj, ...previtem];
          });
        }
      } catch (err) {
        console.log(
          err.response.data.error.message,
          "Opps Something Went Wrong"
        );
      }
    }
    getexpenses()
  },[])

  console.log(expenses);
  const addExpenseHandler = (item) => {
    SetExpenses((previtem) => {
      return [item, ...previtem];
    });
  };
  const delExpenseHandler = (id) => {};
  const editExpenseHandler = (id) => {};
  const state = {
    expenses: expenses,
    addExpense: addExpenseHandler,
    delExpense: delExpenseHandler,
    editExpense: editExpenseHandler,
  };
  return (
    <ExpenseContext.Provider value={state}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseProvider;
