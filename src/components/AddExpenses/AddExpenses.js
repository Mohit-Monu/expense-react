import { useRef, useState } from "react";
import "./AddExpenses.css";
import { expensesActions } from "../../store/expense";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function AddExpenses(props) {
  const theme = useSelector((state) => state.premium.theme);

  const dispatch = useDispatch();
  const editdetails=useSelector(state=>state.expense.editExpenses)
  const [loader, SetLoader] = useState(false);
  const AmountRef = useRef();
  const DescreptionRef = useRef();
  const CategoryRef = useRef();
  if (editdetails!=null) {
    AmountRef.current.value = editdetails[0].amount;
    DescreptionRef.current.value = editdetails[0].description;
    CategoryRef.current.value = editdetails[0].category;
  }
  async function AddExpenseHandler(e) {
    SetLoader(true);
    e.preventDefault();
    const obj = {
      amount: AmountRef.current.value,
      description: DescreptionRef.current.value,
      category: CategoryRef.current.value,
    };
    const config = {
      method: "POST",
      url: `https://e-commerce-ed719-default-rtdb.firebaseio.com/expenses.json`,
      data: obj,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const id = await axios(config);
    const objWithId = { ...obj, id: id.data.name };
    AmountRef.current.value = "";
    DescreptionRef.current.value = "";
    CategoryRef.current.value = "";
    dispatch(expensesActions.addExpense(objWithId));
    SetLoader(false);
  }
  return (
    <form onSubmit={AddExpenseHandler} >
      <div className="login-box" >
        <div className="login-header">
          <header className={`text-${theme==="dark"?"light":"dark"}`}>Add All Your Expenses Here.</header>
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
        <div className="input-submit ">
          <input type="submit" className={`submit-btn bg-light bg-${theme==="dark"?"light":"dark"}`} id="submit" disabled={loader} value="" />
          <label htmlFor="submit" className={`text-${theme}`}>
            {!loader ? (
              "Submit"
            ) : (
              <>
                <span
                  className="spinner-grow spinner-grow-sm"
                  aria-hidden="true"
                ></span>
                <span role="status">Loading...</span>
              </>
            )}
          </label>
        </div>
      </div>
    </form>
  );
}
export default AddExpenses;