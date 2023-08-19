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
import { useState } from "react";
import LogIn from "./components/Auth/LogIn";
import Display from "./components/Display/Display";
import Profile from "./components/Profile/Profile";
import ForgetPassword from "./components/Auth/ForgetPassword";
import AddExpenses from "./components/AddExpenses/AddExpenses";
import ShowExpenses from "./components/ShowExpenses/ShowExpenses";
import { useSelector } from "react-redux";
function App() {
  const isLoggedIn=useSelector(state=>state.auth.isAuthenticated)
  const [ErrorAl, SetErrorAl] = useState(false);
  const [Errormessage, SetErrorMessage] = useState("");
  const [ErrorHead, SetErrorHead] = useState("");
  const [EditObj, SetEditObj] = useState();


  function ErrorAlertHandler(error, head) {
    if (ErrorAl === false) {
      SetErrorMessage(error);
      SetErrorHead(head);
      SetErrorAl(true);
    } else {
      SetErrorAl(false);
    }
  }
  function prefilledHandler(obj){
    SetEditObj(obj)
  }
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header></Header>
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
              <Header ></Header>
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
              <Header ></Header>
              <ForgetPassword error={ErrorAlertHandler}></ForgetPassword>
            </>
          }
        />
        <Route
          path="/expense"
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
                <Display error={ErrorAlertHandler}></Display>
                <AddExpenses prefilled={EditObj} error={ErrorAlertHandler}></AddExpenses>
                <ShowExpenses onPrefilled={prefilledHandler} ></ShowExpenses>
              </>
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
