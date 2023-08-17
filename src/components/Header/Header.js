import Button from "react-bootstrap/Button";
import "./Header.css"
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
function Header() {

  return (
    <div>
      <Navbar expand="lg" className="bg-dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">E-Commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact Us</NavLink>
            </Nav>
          </Navbar.Collapse>
          <div>
              <Button
                style={{ display: "flex", float: "left", marginRight: "5px" }}
                variant="outline-info"
              >
                <NavLink to="/signup"> Log-In / Sign Up</NavLink>
              </Button>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}
export default Header;
