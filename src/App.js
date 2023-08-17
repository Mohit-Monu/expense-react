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

function App() {
  const [ErrorAl,SetErrorAl]=useState(false)
  const [Errormessage,SetErrorMessage]=useState("")
  const [ErrorHead,SetErrorHead]=useState("")

  function ErrorAlertHandler(error,head){
    if(ErrorAl===false){
      SetErrorMessage(error)
      SetErrorHead(head)
      SetErrorAl(true)
    }else{
      SetErrorAl(false)
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
              {ErrorAl &&<ErrorAlert ErrorHead={ErrorHead} message={Errormessage} onHide={ErrorAlertHandler}></ErrorAlert>}
              <Header></Header>
              <SignUp error={ErrorAlertHandler}></SignUp>
            </>
          }
        />
         <Route
          path="/login"
          element={
            <>
              <Header></Header>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
