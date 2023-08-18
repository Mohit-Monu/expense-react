import { useRef } from "react";
import "./AddExpenses.css";

function AddExpenses(props) {
  const AmountRef = useRef();
  const DescreptionRef = useRef();
  const CategoryRef = useRef();

  async function AddExpenseHandler(e){
    e.preventDefault()
    try {
      const config = {
        method: "POST",
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
        data: {
          amount: AmountRef.current.value,
          description: DescreptionRef.current.value,
          category: CategoryRef.current.value,
          returnSecureToken: true,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(config)
    //   const res = await axios(config);
    } catch (err) {
      props.error(err.response.data.error.message, "Opps Something Went Wrong");
    }
  }
  return (
    <form onSubmit={AddExpenseHandler} >
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
          <input type="submit" className="submit-btn" />
          <label htmlFor="submit">Submit</label>
        </div>
      </div>
    </form>
  );
}
export default AddExpenses;
