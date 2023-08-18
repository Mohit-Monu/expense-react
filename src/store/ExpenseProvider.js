import { useEffect, useState } from "react";
import ExpenseContext from "./Expense-context";
import axios from "axios";
const ExpenseProvider = (props) => {
  const [expenses, SetExpenses] = useState([]);
  async function getExpenses() {
    try {
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
      SetExpenses(fetchedExpenses);
    } catch (err) {
      console.log(err.response.data.error.message, "Opps Something Went Wrong");
    }
  }
  useEffect(() => {
    getExpenses();
  }, []);

  async function addExpenseHandler(item) {
    try {
      const config = {
        method: "POST",
        url: `https://e-commerce-ed719-default-rtdb.firebaseio.com/expenses.json`,
        data: item,
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios(config);
    } catch (err) {
      console.log(err.response.data.error.message, "Opps Something Went Wrong");
    }
    await getExpenses();
  }
  async function delExpenseHandler(id) {
    try {
      const config = {
        method: "DELETE",
        url: `https://e-commerce-ed719-default-rtdb.firebaseio.com/expenses/${id}.json`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios(config);
    } catch (err) {
      console.log(err.response.data.error.message, "Opps Something Went Wrong");
    }
    await getExpenses();
  }
  async function editExpenseHandler(id) {
    try{
      const config={
        method:"GET",
        url:`https://e-commerce-ed719-default-rtdb.firebaseio.com/expenses/${id}.json`,
        headers: {
          "Content-Type": "application/json",
        }
      }
      const res=await axios(config)
      // delExpenseHandler(id)
      return(res.data)
    }catch(err){
      console.log(err)
    }
  }

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
