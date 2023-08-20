import { premiumActions } from "../../store/premium";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
function Display(props) {
  const theme = useSelector((state) => state.premium.theme);
  const dispatch = useDispatch();
  const isPremium = useSelector((state) => state.premium.isPremium);
  const initialexpenses = useSelector((state) => state.expense.expenses);
  const [profilecomplete, setProfileComplete] = useState(false);
  const [BuyPreBtn, setBuyPreBtn] = useState(false);

  useEffect(() => {
    async function PageLoader() {
      try {
        const token = localStorage.getItem("token");
        const config = {
          method: "Post",
          data: {
            idToken: token,
          },
          url: `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_API_KEY}`,
          headers: {
            "Content-Type": "application/json",
          },
        };
        const res = await axios(config);
        const data = res.data.users[0];
        if (data.photoUrl && data.displayName) {
          setProfileComplete(true);
        } else {
          setProfileComplete(false);
        }
        let totalexp = 0;
        initialexpenses.forEach((element) => {
          totalexp = totalexp + +element.amount;
        });
        if (totalexp >= 10000) {
          setBuyPreBtn(true);
          if (isPremium) {
            setBuyPreBtn(false);
          }
        } else {
          setBuyPreBtn(false);
        }
      } catch (err) {
        props.error(
          err.response.data.error.message,
          "Opps Something Went Wrong"
        );
      }
    }
    PageLoader();
  }, [initialexpenses, isPremium]);
  async function VerifyEmailHandler() {
    const token = localStorage.getItem("token");
    const config = {
      method: "Post",
      data: {
        requestType: "VERIFY_EMAIL",
        idToken: token,
      },
      url: `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_API_KEY}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios(config);
      console.log(res.data);
    } catch (err) {
      props.error(err.response.data.error.message, "Opps Something Went Wrong");
    }
  }
  function byrPreHandler() {
    dispatch(premiumActions.PremiumMaker());
  }
  function enableDarkHandler() {
    dispatch(premiumActions.theme());
  }
  function DownloadExpensesHandler(){
    const blob=new Blob(initialexpenses,{type:'text/csv'})
    console.log(initialexpenses)
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();
    URL.revokeObjectURL(url);
    
  }
  return (
    <div>
      <Container fluid className="text-center mb-1 bg-success pt-4 pb-4">
        <h1 style={{ fontSize: "50px" }}>Welcome to Expense Tracker!!!</h1>
      </Container>
      <div style={{ height: "50px" }}>
        <button
          onClick={VerifyEmailHandler}
          className="btn btn-danger"
          style={{ float: "left", marginLeft: "20px" }}
        >
          Verify Email
        </button>
        {BuyPreBtn && (
          <button
            onClick={byrPreHandler}
            className="btn btn-warning"
            style={{ float: "left", marginLeft: "20px" }}
          >
            Buy Premium
          </button>
        )}
        {!BuyPreBtn && (
          <button
            onClick={DownloadExpensesHandler}
            className="btn btn-success"
            style={{ float: "left", marginLeft: "20px" }}
          >
            Download Expenses
          </button>
        )}
        {!BuyPreBtn && (
          <div>
            <Form style={{ float: "left", marginLeft: "20px" }}>
              <Form.Check
                onClick={enableDarkHandler}
                className={`text-${theme === "dark" ? "light" : "dark"}`}
                type="switch"
                id="custom-switch"
                label="Enable Dark Mode"
              />
            </Form>
          </div>
        )}
        {!profilecomplete && (
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
        )}
      </div>
    </div>
  );
}
export default Display;
