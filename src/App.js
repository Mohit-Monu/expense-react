import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import SignUp from "./components/Auth/SignUp";
import Header from "./components/Header/Header";
import ErrorAlert from "./components/ErrorAlert/ErrorAlert";
import { useState } from "react";
import LogIn from "./components/Auth/LogIn";
import Display from "./components/Display/Display";
import Profile from "./components/Profile/Profile";
import ForgetPassword from "./components/Auth/ForgetPassword";
function App() {
  const [ErrorAl, SetErrorAl] = useState(false);
  const [Errormessage, SetErrorMessage] = useState("");
  const [ErrorHead, SetErrorHead] = useState("");
  const [IsLogin, SetIsLogin] = useState(false);

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
            <>
              {ErrorAl && (
                <ErrorAlert
                  ErrorHead={ErrorHead}
                  message={Errormessage}
                  onHide={ErrorAlertHandler}
                ></ErrorAlert>
              )}
              <Header IsLogin={IsLogin} OnLogin={LoginHandler}></Header>
              <Display error={ErrorAlertHandler}></Display>
            </>
          }
        />
        <Route
          path="/profile"
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
              <Profile error={ErrorAlertHandler}></Profile>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
