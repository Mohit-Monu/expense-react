import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignUp from "./components/Auth/SignUp";
import Header from "./components/Header/Header";
import ErrorAlert from "./components/ErrorAlert/ErrorAlert";
import { useEffect, useState } from "react";
import LogIn from "./components/Auth/LogIn";
import Display from "./components/Display/Display";
import Profile from "./components/Profile/Profile";
import ForgetPassword from "./components/Auth/ForgetPassword";
import AddExpenses from "./components/AddExpenses/AddExpenses";
import ShowExpenses from "./components/ShowExpenses/ShowExpenses";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { expensesActions } from "./store/expense";
function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const email = useSelector((state) => state.auth.email);
  const [ErrorAl, SetErrorAl] = useState(false);
  const [Errormessage, SetErrorMessage] = useState("");
  const [ErrorHead, SetErrorHead] = useState("");
  const theme = useSelector((state) => state.premium.theme);
  function ErrorAlertHandler(error, head) {
    if (ErrorAl === false) {
      SetErrorMessage(error);
      SetErrorHead(head);
      SetErrorAl(true);
    } else {
      SetErrorAl(false);
    }
  }
  useEffect(() => {
      if (email) {
        async function getdata() {
          const config = {
            method: "GET",
            url: `https://e-commerce-ed719-default-rtdb.firebaseio.com/expenses/${email}.json`,
            headers: {
              "Content-Type": "application/json",
            },
          };
          const res = await axios(config);
          const fetchedExpenses = [];
          for (const key in res.data) {
            fetchedExpenses.push({
              id: key,
              amount: res.data[key].amount,
              category: res.data[key].category,
              description: res.data[key].description,
            });
          }
          dispatch(expensesActions.initialExp(fetchedExpenses));
        }
        getdata();
      }
  },[email,dispatch]);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header></Header>
              <Display error={ErrorAlertHandler}></Display>
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              {ErrorAl && (
                <ErrorAlert
                  ErrorHead={ErrorHead}
                  message={Errormessage}
                  onHide={ErrorAlertHandler}
                ></ErrorAlert>
              )}
              <Header></Header>
              <SignUp error={ErrorAlertHandler}></SignUp>
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              {ErrorAl && (
                <ErrorAlert
                  ErrorHead={ErrorHead}
                  message={Errormessage}
                  onHide={ErrorAlertHandler}
                ></ErrorAlert>
              )}
              <Header></Header>
              <LogIn error={ErrorAlertHandler}></LogIn>
            </>
          }
        />
        <Route
          path="/forgetpass"
          element={
            <>
              {ErrorAl && (
                <ErrorAlert
                  ErrorHead={ErrorHead}
                  message={Errormessage}
                  onHide={ErrorAlertHandler}
                ></ErrorAlert>
              )}
              <Header></Header>
              <ForgetPassword error={ErrorAlertHandler}></ForgetPassword>
            </>
          }
        />
        <Route
          path="/expense"
          element={
            isLoggedIn ? (
              <div className={`bg-${theme}`}>
                {ErrorAl && (
                  <ErrorAlert
                    ErrorHead={ErrorHead}
                    message={Errormessage}
                    onHide={ErrorAlertHandler}
                  ></ErrorAlert>
                )}
                <Header></Header>
                <Display error={ErrorAlertHandler}></Display>
                <AddExpenses error={ErrorAlertHandler}></AddExpenses>
                <ShowExpenses></ShowExpenses>
              </div>
            ) : (
              <Navigate to="/login"></Navigate>
            )
          }
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <>
                {ErrorAl && (
                  <ErrorAlert
                    ErrorHead={ErrorHead}
                    message={Errormessage}
                    onHide={ErrorAlertHandler}
                  ></ErrorAlert>
                )}
                <Header></Header>
                <Profile error={ErrorAlertHandler}></Profile>
              </>
            ) : (
              <Navigate to="/login"></Navigate>
            )
          }
        />

        <Route
          path="*"
          element={
            <>
              <Navigate to="/"></Navigate>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
