const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true, 
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "volunteer", "expert"], // Ensuring valid roles
    default: "volunteer" // Default role assigned
  },
  status: { 
    type: String, 
    enum: ["pending", "approved"], 
    default: "pending" 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = Farmer;
