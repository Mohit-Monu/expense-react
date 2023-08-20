import { useEffect, useState } from "react";
import { expensesActions } from "../../store/expense";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function ShowExpenses() {
  const theme=useSelector(state=>state.premium.theme)
  const email=useSelector(state=>state.auth.email)

  const dispatch = useDispatch();
  const initialexpenses = useSelector((state) => state.expense.expenses);
  const [tableCandy, SetTableCandy] = useState();

  useEffect(() => {
    SetTableCandy([]);
    const expenses = initialexpenses.map((element, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>Rs.{element.amount}</td>
        <td>{element.description}</td>
        <td>{element.category}</td>
        <td>
          <button
            onClick={DeleteExpHandler}
            className="btn btn-danger"
            value={element.id}
            style={{ marginRight: "6px" }}
            type="button"
          >
            Delete
          </button>
          <button
            onClick={EditExpHandler}
            className="btn btn-secondary"
            value={element.id}
            style={{ marginRight: "6px" }}
            type="button"
          >
            Edit
          </button>
        </td>
      </tr>
    ));
    SetTableCandy(expenses);
  }, [initialexpenses,email]);
  async function DeleteExpHandler(e) {
    e.target.innerHTML = "Loading...";
    e.target.disabled = true;
    const id = e.target.value;
    const config = {
      method: "DELETE",
      url: `https://e-commerce-ed719-default-rtdb.firebaseio.com/expenses/${email}/${id}.json`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios(config);
    dispatch(expensesActions.delExpense(id));
    e.target.disabled = false;
    e.target.innerHTML = "Delete";
  }
  async function EditExpHandler(e) {
    e.target.innerHTML = "Loading...";
    e.target.disabled = true;
    const id = e.target.value;
    const config = {
      method: "DELETE",
      url: `https://e-commerce-ed719-default-rtdb.firebaseio.com/expenses/${email}/${id}.json`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios(config);
    dispatch(expensesActions.editExpense(id));
    setTimeout(()=>{
    dispatch(expensesActions.editToNull());
    },1000)
    e.target.disabled = false;
    e.target.innerHTML = "Edit";
  }
  return (
    <div className="container text-center">
      <h1 className={`text-${theme==="dark"?"light":"dark"}`}>All Expenses</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sl.no</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{tableCandy}</tbody>
      </table>
    </div>
  );
}
export default ShowExpenses;
