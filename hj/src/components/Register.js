import React, { useState } from "react";
import "../styles/Register.css";
import p1 from '../assets/signup-photo.jpg';
import { useNavigate } from 'react-router-dom';


const SignUpPage = () => {
  const api=`http://localhost:3001`
  //const api=`https://agriproject-120l.onrender.com`
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "volunteer"
  });

  const [errors, setErrors] = useState({
    passwordMismatch: false,
    emptyFields: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword, role } = formData;
    if (!firstName || !lastName || !email || !password || !confirmPassword || !role) {
      setErrors({ ...errors, emptyFields: true });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ ...errors, passwordMismatch: true });
      return;
    }

    try {
      const response = await fetch(`${api}/api/farmers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          email,
          password,
          role
        })
      });

      if (response.ok) {
        alert("Registration successful!");
        // Optionally, redirect to login page or another page
        navigate('/login');
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="signup-heading-container">Join the movement <br />empowering millions with IFTR <br />for sustainable development</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-name-container">
            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="signup-password-container">
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Role:</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="volunteer">Volunteer</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          </div>
          {errors.passwordMismatch && (
            <p className="error-message">Passwords do not match</p>
          )}
          {errors.emptyFields && (
            <p className="error-message">Please fill in all fields</p>
          )}

          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>
      </div>

      <div className="image-container">
        <img
          src={p1}
          alt="Placeholder"
          className="signup-image"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
