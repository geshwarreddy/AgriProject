const express = require("express");
const jwt = require("jsonwebtoken");

const Ledger = require("../models/Ledger.js");
const twilio = require("twilio");

const router = express.Router();

router.post("/ledger-submit", async (req, res) => {
  try {
    // Get data from the request body
    const {
      farmerName,
      pincode,
      aadharNumber,
      contactNumber,
      areaPloughed,
      season,
      cropGrown,
      seedsUsed,
      seedSownDate,
      transplanting,
      irrigationMethod,
      fertilizersUsed,
      harvestingDate,
      yield,
    } = req.body;

    // Create a new instance of the Ledger model with the received data
    const newLedger = new Ledger({
      farmerName,
      pincode,
      aadharNumber,
      contactNumber,
      areaPloughed,
      season,
      cropGrown,
      seedsUsed,
      seedSownDate,
      transplanting,
      irrigationMethod,
      fertilizersUsed,
      harvestingDate,
      yield,
    });

    // Save the new ledger document to MongoDB
    await newLedger.save();

    // Send a success response back to the client
    res.status(201).json({ message: "Form data submitted successfully!" });
  } catch (err) {
    // Handle any errors that occurred during the process
    console.error(err);
    res
      .status(500)
      .json({ message: "Error saving form data. Please try again." });
  }
});

router.get("/ledgers", async (req, res) => {
  try {
    const ledgers = await Ledger.find();
    res.status(200).json(ledgers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching ledgers." });
  }
});

router.get("/ledgers/:id", async (req, res) => {
  try {
    const ledger = await Ledger.findById(req.params.id);
    res.status(200).json(ledger);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching ledger." });
  }
});
// Assuming you are using Express.js
router.put('/ledgers/:id', async (req, res) => {
  try {
    const updatedLedger = await Ledger.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    res.json(updatedLedger);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = new twilio(accountSid, authToken);

router.post("/send-suggestion", async (req, res) => {
  const { contactNumber, message } = req.body;
  try {
    await client.messages.create({
      body: message,
      to: contactNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
    });
    res.status(200).json({ message: "Suggestion sent successfully!" });
  } catch (error) {
    console.error("Error sending suggestion:", error);
    res.status(500).json({ message: "Error sending suggestion." });
  }
});

module.exports = router;
