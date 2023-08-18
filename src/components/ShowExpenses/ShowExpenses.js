import { useEffect, useState } from "react";

function ShowExpenses(props) {
  const [tableCandy, SetTableCandy] = useState();

  function DeleteExpHandler() {}
  // useEffect(() => {
  //   SetTableCandy(() => {
  //     return props.candys.map((element, index) => (
  //       <tr key={element._id}>
  //         <td>{index + 1}</td>
  //         <td>{element.name}</td>
  //         <td>{element.description}</td>
  //         <td>Rs.{element.price}</td>
  //         <td>
  //           <button
  //             onClick={DeleteExpHandler}
  //             className="btn btn-danger"
  //             value={element._id}
  //             style={{ marginRight: "6px" }}
  //             type="button"
  //           >
  //             Delete
  //           </button>
  //         </td>
  //       </tr>
  //     ));
  //   });
  // }, [props.candys]);
  return (
    <div className="container text-center">
      <h1>All Expenses</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Sl.no</th>
            <th>Name</th>
            <th>Description</th>
            <th>price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {tableCandy} */}
          <tr >
            <td>ytdhgc</td>
            <td>hcggchj</td>
            <td>hghgvjvggjy</td>
            <td>Rs.46</td>
            <td>
              <button
                onClick={DeleteExpHandler}
                className="btn btn-danger"
                value="gughhg"
                style={{ marginRight: "6px" }}
                type="button"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
export default ShowExpenses;
