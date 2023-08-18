import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
function Display(props) {
  async function VerifyEmailHandler(){
    const token = localStorage.getItem("token");
      const config = {
        method: "Post",
        data: {
          requestType:"VERIFY_EMAIL",
          idToken: token,
        },
        url: `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_API_KEY}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const res = await axios(config);
        console.log(res.data)
      } catch (err) {
        props.error(err.response.data.error.message, "Opps Something Went Wrong");
      }
  }
  return (
    <div>
      <Container fluid className="text-center mb-1 bg-success pt-4 pb-4">
        <h1 style={{ fontSize: "50px" }}>Welcome to Expense Tracker!!!</h1>
      </Container>
        <button onClick={VerifyEmailHandler} className="btn btn-danger" style={{ float: "left" }}>
          Verify Email
        </button>
      <div
        style={{ float: "right", borderRadius: "20px" }}
        className="bg-danger-subtle p-2"
      >
        <span style={{ float: "left" }}>
          Your profile is Incomplete.
          <NavLink
            to="/profile"
            style={{
              float: "right",
              marginLeft: "5px",
              marginRight: "10px",
              color: "red",
            }}
          >
            Complete now
          </NavLink>
        </span>
      </div>
    </div>
  );
}
export default Display;
