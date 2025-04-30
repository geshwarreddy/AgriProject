import React, { useState } from "react";
import "../styles/Contact.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    query: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the form data
    console.log("Form submitted:", formData);
    // You can handle form submission logic here (e.g., sending data to a server)
  };

  return (
    <div className="contact-main">
      <div className="contact-left-container">
        <p>Hi</p>
      </div>
      <div className="contact-right-container">
        <div className="contact-form-container">
          <h1>Got  any  query? Isn't it solved yet?</h1>
          <p style={{textAlign:"left"}}>Tell us more about yourself and what you've got in mind</p>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="contact-form-name-group">
              <div className="contact-form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact-form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="contact-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="contact-form-group">
              <label htmlFor="query">Query</label>
              <textarea
                id="query"
                name="query"
                value={formData.query}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
