const express = require("express");
const jwt = require("jsonwebtoken");
const Farmer = require("../models/Farmer.js"); // Import the Farmer model
const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config();

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Route for registering the Farmer
router.post("/farmers", async (req, res) => {
  try {
    const farmer = new Farmer(req.body);
    await farmer.save();

    // // Read the HTML template
    // fs.readFile('./templates/register_success.html', 'utf8', (err, html) => {
    //   if (err) {
    //     return console.log(err);
    //   }

    //   // Replace placeholders with actual data
    //   const htmlContent = html.replace('{{username}}', farmer.firstname);

    //   // Email options
    //   const mailOptions = {
    //     from: process.env.EMAIL_USER,
    //     to: farmer.email,
    //     subject: 'IFTR Registration Successful',
    //     html: htmlContent
    //   };

    //   // Send email
    //   transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //       return console.log(error);
    //     }
    //     console.log('Email sent: ' + info.response);
    //   });
    // });

    // res.status(201).send(farmer);
    res.status(201).json({ 
      message: "Signup successful. Awaiting admin approval." 
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/admin/approve-volunteer/:id", async (req, res) => {
  try {
    const { role } = req.body; // Get role from frontend request
    console.log("role",role);
    if (role !== "admin") {
      return res.status(403).json({ msg: "Unauthorized: Only admins can approve users" });
    }
    const volunteer = await Farmer.findByIdAndUpdate(
      req.params.id, 
      { status: "approved" }, 
      { new: true }
    );

    if (!volunteer){
      return res.status(404).json({ message: "Volunteer not found" });
    }

    // ✅ Send Email Notification on Approval
    fs.readFile("./templates/register_success.html", "utf8", (err, html) => {
      if (err) return console.log(err);

      const emailContent = html.replace("{{username}}", volunteer.firstname);

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: volunteer.email,
        subject: "Your IFTR Registration is Approved",
        html: emailContent
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error);
        console.log("Approval email sent: " + info.response);
      });
    });

    res.status(200).json({ 
      message: "Volunteer approved successfully." 
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const farmer = await Farmer.findOne({ email, password });
    console.log("farmer",farmer,email,password);
    if (!farmer) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }
    if (farmer.status !== "approved") {
      return res.status(403).json({ message: "Account pending admin approval" });
    }
    // Generate JWT
    const token = jwt.sign({ id: farmer._id, role: farmer.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    const user={...farmer._doc,token};
    console.log("user",user,farmer);
    res.status(200).json({ user, success: "Login successful" });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Logout route
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).send("Logout successful");
});

// Route to check login status
router.get("/check-login", async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "No user logged in" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const farmer = await Farmer.findById(verified.id);
    if (!farmer) {
      return res.status(401).json({ msg: "User not found" });
    }
    res.status(200).json({ user: farmer, msg: "User Logged in" });
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
});

router.get("/pending-approvals", async (req, res) => {
  const { role } = req.query; // Get role from frontend request
  // console.log("role",role);
  if (role !== "admin") {
    return res.status(403).json({ msg: "Unauthorized: Only admins can access this" });
  }
  
  try {
    const pendingUsers = await Farmer.find({ status: "pending" }).select("-password"); // Exclude passwords
    res.status(200).json(pendingUsers);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching approval requests", error });
  }
});

// Approve a user
router.put("/approve/:id", async (req, res) => {
  const { role } = req.body; // Get role from frontend request
  console.log("role",role);
  if (role !== "admin") {
    return res.status(403).json({ msg: "Unauthorized: Only admins can approve users" });
  }

  try {
    const user = await Farmer.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).json({ msg: "User approved successfully", user });
  } catch (error) {
    res.status(500).json({ msg: "Error approving user", error });
  }
});

// Reject a user
router.delete("/reject/:id", async (req, res) => {
  const { role } = req.body; // Get role from frontend request

  if (role !== "admin") {
    return res.status(403).json({ msg: "Unauthorized: Only admins can reject users" });
  }

  try {
    const user = await Farmer.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).json({ msg: "User rejected and removed" });
  } catch (error) {
    res.status(500).json({ msg: "Error rejecting user", error });
  }
});

module.exports = router;
