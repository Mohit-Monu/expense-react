import { useContext, useEffect, useState } from "react";
import ExpenseContext from "../../store/Expense-context";
function ShowExpenses(props) {
  const [tableCandy, SetTableCandy] = useState();
  const ExpenseCtx = useContext(ExpenseContext);
  useEffect(() => {
    SetTableCandy([]);
    const expenses = ExpenseCtx.expenses.map(
      (element, index) => (
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
      ),
      []
    );
    SetTableCandy(expenses);
  }, [ExpenseCtx.expenses]);
  async function DeleteExpHandler(e) {
    e.target.innerHTML = "Loading..."
    e.target.disabled=true
    const id = e.target.value;
    await ExpenseCtx.delExpense(id);
    e.target.disabled=false
    e.target.innerHTML = "Delete"
  }
  async function EditExpHandler(e) {
    e.target.innerHTML = "Loading..."
    e.target.disabled=true
    const id = e.target.value;
    const exp = await ExpenseCtx.editExpense(id);
    props.onPrefilled(exp);
    e.target.disabled=false
    e.target.innerHTML = "Edit"
  }
  return (
        <div className="container text-center">
          <h1>All Expenses</h1>
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
