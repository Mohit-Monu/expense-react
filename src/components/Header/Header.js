import Button from "react-bootstrap/Button";
import "./Header.css";
import { NavLink,useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { authActions } from "../../store/auth";
import { expensesActions } from "../../store/expense";
import { useDispatch, useSelector } from "react-redux";
function Header() {
  const dispatch=useDispatch()
  const isLoggedIn =useSelector(state=>state.auth.isAuthenticated)

  const navigate = useNavigate();
  function LogoutHandler(){
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    dispatch(authActions.logout())
    dispatch(expensesActions.initialExp([]))
    navigate("/")
  }
  return (
    <div>
      <Navbar expand="lg" className="bg-dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">Expense Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {isLoggedIn && <NavLink to="/expense">My Expenses</NavLink>}
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              {isLoggedIn && <NavLink to="/profile">Profile</NavLink>}

            </Nav>
          </Navbar.Collapse>
          {!isLoggedIn &&
            <div>
              <Button
                style={{ display: "flex", float: "left", marginRight: "5px" }}
                variant="outline-info"
              >
                <NavLink to="/signup"> Log-In / Sign Up</NavLink>
              </Button>
            </div>
          }
          {isLoggedIn &&
            <div>
              <Button
                style={{ display: "flex", float: "left", marginRight: "5px" }}
                variant="outline-info" onClick={LogoutHandler}
              >
                <NavLink to=""> Log-Out</NavLink>
              </Button>
            </div>
          }
        </Container>
      </Navbar>
    </div>
  );
}
export default Header;
