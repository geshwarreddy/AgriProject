// useEffect(() => {
//   if (user) {
//     navigate("/"); // Redirect to home if user is already logged in
//   }
// }, [user]);
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import '../styles/Login.css';
import { useDispatch } from "react-redux";
import { settingUser } from "../redux/Silce/userSlice";


export default function Login() {
  const api=`http://localhost:3001`
  //const api=`https://agriproject-120l.onrender.com`
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${api}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Includes cookies
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        await dispatch(settingUser(data.user));
        // setUser(data.user);
        alert("Login Successful");
        navigate("/"); // Redirect to home
      } else {
        alert("Login Failed");
        console.log(response);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="login-main">
      <div className="login-left-container">
        <h1>Welcome Back</h1>
        <p>Explore opportunities and join us in shaping a sustainable future.</p>
        <div className="login-form-container">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-form-group">
              <label htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                name="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link to="/forgotpassword">Forgot Password?</Link>
            <button type="submit" className="login-submit-btn">Sign in</button>
          </form>
        </div>
      </div>
      <div className="login-right-container">
        <p>Not a User?</p>
        <Link to="/register">Sign Up</Link>
      </div>
    </div>
  );
}
