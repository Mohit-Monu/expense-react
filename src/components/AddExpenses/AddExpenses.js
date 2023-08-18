import { useContext, useEffect, useRef, useState } from "react";
import "./AddExpenses.css";
import ExpenseContext from "../../store/Expense-context";
function AddExpenses(props) {
  const [loader,SetLoader]=useState(false)
  const AmountRef = useRef();
  const DescreptionRef = useRef();
  const CategoryRef = useRef();
  const ExpenseCtx = useContext(ExpenseContext);
  async function AddExpenseHandler(e) {
    SetLoader(true)
    e.preventDefault();
    const obj = {
      amount: AmountRef.current.value,
      description: DescreptionRef.current.value,
      category: CategoryRef.current.value,
    };
    await ExpenseCtx.addExpense(obj);
    SetLoader(false)

  }
  return (
    <form onSubmit={AddExpenseHandler}>
      <div className="login-box">
        <div className="login-header">
          <header>Add All Your Expenses Here.</header>
        </div>
        <div className="input-box">
          <input
            ref={AmountRef}
            type="number"
            className="input-field"
            placeholder="Enter Your Expense Amount."
            required
          />
        </div>
        <div className="input-box">
          <input
            ref={DescreptionRef}
            type="text"
            className="input-field"
            placeholder="Enter Your Product Discription."
            required
          />
        </div>
        <div className="input-box">
          <select className="input-field" required ref={CategoryRef}>
            <option value="">Select</option>
            <option value="Fuel">Fuel</option>
            <option value="Food">Food</option>
            <option value="Movie">Movie</option>
            <option value="Grocery">Grocery</option>
            <option value="Electricity">Electricity</option>
            <option value="Electricals">Electricals</option>
            <option value="Others.">Others.</option>
          </select>
        </div>
        <div className="input-submit">
          <input type="submit" className="submit-btn"  disabled={loader}/>
          <label htmlFor="submit" >{!loader ? "Submit":"Loading..."}</label>
        </div>
      </div>
    </form>
  );
}
export default AddExpenses;
