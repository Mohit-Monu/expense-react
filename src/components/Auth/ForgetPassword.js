import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";

function ForgetPassword(props) {
  const EmailRef = useRef();
  async function ResetPasswordHandler(e) {
    e.preventDefault();
    try {
      const config = {
        method: "POST",
        url: `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_API_KEY}`,
        data: {
          email: EmailRef.current.value,
          requestType:"PASSWORD_RESET"
        },
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios(config);
      console.log(res.data.email)
      props.error(`Email was sent successfuly at ${res.data.email} please click on the link to verify and set new password `,"Email sent Successfully")
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
        Reset Password
      </h1>
      <hr />
      <form onSubmit={ResetPasswordHandler}>
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
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-dark mb-3">
            Send Link
          </button>
        </div>
        <NavLink to="/login" style={{ color: "black" }}>
          Have an account? Login
        </NavLink>

        <br />
      </form>
    </Container>
  );
}
export default ForgetPassword;
