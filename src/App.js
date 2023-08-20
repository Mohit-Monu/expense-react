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
                <AddExpenses  error={ErrorAlertHandler}></AddExpenses>
                <ShowExpenses ></ShowExpenses>
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
