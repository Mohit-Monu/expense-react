import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { authActions } from "../../store/auth";
import { useDispatch} from "react-redux";
function LogIn(props) {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const EmailRef = useRef();
  const PasswordRef = useRef();

  async function LoginHandler(e) {
    e.preventDefault();
    
    try {
      const config = {
        method: "POST",
        url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
        data: {
          email: EmailRef.current.value,
          password: PasswordRef.current.value,
          returnSecureToken: true,
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios(config);
      localStorage.setItem("token", res.data.idToken);
      dispatch(authActions.login())
      navigate("/expense");
    } catch (err) {
      props.error(err.response.data.error.message, "Opps Something Went Wrong");
    }
  }
  return (
    <Container
      className="mt-5 pb-4 pt-4 text-center border border-warning "
      style={{ width: "500px" }}
    >
      <h1 className="mb-4" style={{ fontSize: "30px", color: "red" }}>
        Log-In
      </h1>
      <hr />
      <form onSubmit={LoginHandler}>
        <Form.Floating className="mb-3">
          <Form.Control
            ref={EmailRef}
            id="floatingInputCustom"
            type="email"
            required
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInputCustom">Email address</label>
        </Form.Floating>
        <Form.Floating className="mb-3">
          <Form.Control
            ref={PasswordRef}
            id="floatingPasswordCustom"
            type="password"
            required
            placeholder="Password"
          />
          <label htmlFor="floatingPasswordCustom">Password</label>
        </Form.Floating>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-dark mb-3">
            Log-In
          </button>
        </div>
        <NavLink to="/signup" style={{ color: "black" }}>
          Don't have an account? Sign up
        </NavLink>
        <br/>
        <NavLink to="/forgetpass" style={{ color: "red" }}>
          forget password?
        </NavLink>
      </form>
    </Container>
  );
}
export default LogIn;
