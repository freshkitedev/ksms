import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [userType, setUserType] = useState("student");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Redirect to the respective dashboard based on the selected user type
    if (userType === "student") {
      navigate("/dashboard");
    } else if (userType === "admin") {
      navigate("/dashboard");
    } else if (userType === "staff") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="col-12 md-4">
     <div class="login-box">
  <h2>Login</h2>
  <form>
    <div class="user-box">
      <input type="text" name="" required=""/>
      <label>Username</label>
    </div>
    <div class="user-box">
      <input type="password" name="" required=""/>
      <label>Password</label>
    </div>
    <a href="/dashboard">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </a>
  </form>
</div>
    </div>
  );
};
export default Login;