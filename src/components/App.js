import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Login"; 
import SignupForm from "./SignupForm"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} /> 
        <Route path="/signup" element={<SignupForm />} /> 
      </Routes>
    </Router>
  );
}

export default App;
