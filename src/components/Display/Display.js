import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
function Display() {
  return (
    <div>
      <Container fluid className="text-center mt-4 mb-1 bg-success pt-4 pb-4">
        <h1 style={{ fontSize: "50px" }}>Welcome to Expense Tracker!!!</h1>
      </Container>
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
