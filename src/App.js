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
import ExpenseProvider from "./store/ExpenseProvider"
function App() {
  const [ErrorAl, SetErrorAl] = useState(false);
  const [Errormessage, SetErrorMessage] = useState("");
  const [ErrorHead, SetErrorHead] = useState("");
  const [IsLogin, SetIsLogin] = useState(true);

  function ErrorAlertHandler(error, head) {
    if (ErrorAl === false) {
      SetErrorMessage(error);
      SetErrorHead(head);
      SetErrorAl(true);
    } else {
      SetErrorAl(false);
    }
  }
  function LoginHandler() {
    if (IsLogin === true) {
      SetIsLogin(false);
    } else {
      SetIsLogin(true);
    }
  }
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header IsLogin={IsLogin} OnLogin={LoginHandler}></Header>
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
              <Header IsLogin={IsLogin} OnLogin={LoginHandler}></Header>
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
              <Header IsLogin={IsLogin} OnLogin={LoginHandler}></Header>
              <LogIn OnLogin={LoginHandler} error={ErrorAlertHandler}></LogIn>
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
              <Header IsLogin={IsLogin} OnLogin={LoginHandler}></Header>
              <ForgetPassword error={ErrorAlertHandler}></ForgetPassword>
            </>
          }
        />
        <Route
          path="/expense"
          element={
            IsLogin ? (
              <>
                <ExpenseProvider>
                {ErrorAl && (
                  <ErrorAlert
                    ErrorHead={ErrorHead}
                    message={Errormessage}
                    onHide={ErrorAlertHandler}
                  ></ErrorAlert>
                )}
                <Header IsLogin={IsLogin} OnLogin={LoginHandler}></Header>
                <Display error={ErrorAlertHandler}></Display>
                <AddExpenses error={ErrorAlertHandler}></AddExpenses>
                <ShowExpenses></ShowExpenses>
                </ExpenseProvider>
              </>
            ) : (
              <Navigate to="/login"></Navigate>
            )
          }
        />
        <Route
          path="/profile"
          element={
            IsLogin ? (
              <>
                {ErrorAl && (
                  <ErrorAlert
                    ErrorHead={ErrorHead}
                    message={Errormessage}
                    onHide={ErrorAlertHandler}
                  ></ErrorAlert>
                )}
                <Header IsLogin={IsLogin} OnLogin={LoginHandler}></Header>
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
