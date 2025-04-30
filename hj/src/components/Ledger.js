import React, { useState } from "react";
import '../styles/Ledger.css';

const LedgerForm = () => {
  const [formData, setFormData] = useState({
    farmerName: "",
    pincode: "",
    aadharNumber: "",
    contactNumber: "",
    areaPloughed: "",
    season: "",
    cropGrown: "",
    seedsUsed: "",
    seedSownDate: "",
    transplanting: "",
    irrigationMethod: "",
    fertilizersUsed: "",
    harvestingDate: "",
    yield: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const requiredFields = [
      "farmerName",
      "pincode",
      "aadharNumber",
      "contactNumber",
      "areaPloughed",
      "season",
      "cropGrown",
      "seedsUsed",
      "seedSownDate",
      "transplanting",
      "irrigationMethod",
      "fertilizersUsed",
      "harvestingDate",
      "yield",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill in the ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`);
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Add +91 prefix to contactNumber before validation or submission
    const updatedFormData = {
      ...formData,
      contactNumber: formData.contactNumber.startsWith("+91")
        ? formData.contactNumber
        : `+91${formData.contactNumber.replace(/^\+91/, "")}`, // Ensure only one +91 prefix
    };
  
    if (!validateForm()) return;
  
    try {
      const response = await fetch("http://localhost:3001/api/ledger-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData), // Use updated form data
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit the form. Please try again.");
      }
  
      const data = await response.json();
      setSuccess("Form submitted successfully!");
      setFormData({
        farmerName: "",
        pincode: "",
        aadharNumber: "",
        contactNumber: "",
        areaPloughed: "",
        season: "",
        cropGrown: "",
        seedsUsed: "",
        seedSownDate: "",
        transplanting: "",
        irrigationMethod: "",
        fertilizersUsed: "",
        harvestingDate: "",
        yield: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };
  

  return (
    <main className="ledger-form-main">
    <div className="ledger-form-container">
      <h1>Add Details</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit} className="ledger-form">
        
        <div className="ledger-form-group">
          <label htmlFor="farmerName">Farmer Name</label>
          <input
            type="text"
            name="farmerName"
            value={formData.farmerName}
            onChange={handleChange}
          />
        </div>
        
        <div className="ledger-form-group">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
        </div>

        <div className="ledger-form-group">
          <label htmlFor="aadharNumber">Aadhar Number</label>
          <input
            type="text"
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleChange}
          />
        </div>

        <div className="ledger-form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
        </div>

        <div className="ledger-form-group">
          <label htmlFor="areaPloughed">Area Ploughed (acres)</label>
          <input
            type="number"
            name="areaPloughed"
            value={formData.areaPloughed}
            onChange={handleChange}
          />
        </div>

        <div className="ledger-form-group">
          <label htmlFor="season">Season</label>
          <input
            type="text"
            name="season"
            value={formData.season}
            onChange={handleChange}
          />
        </div>

        <div className="ledger-form-group">
          <label htmlFor="cropGrown">Crop Grown</label>
          <input
            type="text"
            name="cropGrown"
            value={formData.cropGrown}
            onChange={handleChange}
          />
        </div>

        <div className="ledger-form-group">
          <label htmlFor="seedsUsed">Seeds Used</label>
          <input
            type="text"
            name="seedsUsed"
            value={formData.seedsUsed}
            onChange={handleChange}
          />
        </div>

        <div className="ledger-form-group">
          <label htmlFor="seedSownDate">Seed Sown Date</label>
          <input
            type="date"
            name="seedSownDate"
            value={formData.seedSownDate}
            onChange={handleChange}
          />
        </div>

        <div className="ledger-form-group">
          <label htmlFor="transplanting">Transplanting</label>
          <input
            type="text"
            name="transplanting"
            value={formData.transplanting}
            onChange={handleChange}
          />
        </div>

        <div className="ledger-form-group">
          <label htmlFor="irrigationMethod">Irrigation Method</label>
          <input
            type="text"
            name="irrigationMethod"
            value={formData.irrigationMethod}
            onChange={handleChange}
          />
        </div>

        <div className="ledger-form-group">
          <label htmlFor="fertilizersUsed">Fertilizers Used</label>
          <input
            type="text"
            name="fertilizersUsed"
            value={formData.fertilizersUsed}
            onChange={handleChange}
          />
        </div>

        <div className="ledger-form-group">
          <label htmlFor="harvestingDate">Harvesting Date</label>
          <input
            type="date"
            name="harvestingDate"
            value={formData.harvestingDate}
            onChange={handleChange}
          />
        </div>

        <div className="ledger-form-group">
          <label htmlFor="yield">Yield</label>
          <input
            type="text"
            name="yield"
            value={formData.yield}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
    </main>
  );
};

export default LedgerForm;
