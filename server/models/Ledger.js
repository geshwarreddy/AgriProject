const mongoose = require("mongoose");
// ff
const SoilTestSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true }, // Time of test
  pH: { type: Number, min: 0, max: 14 },
  nitrogen: { type: Number, min: 0 },
  phosphorus: { type: Number, min: 0 },
  potassium: { type: Number, min: 0 },
  organicCarbon: { type: Number, min: 0 },
  moistureLevel: { type: Number, min: 0, max: 100 },
  microbialCount: { type: Number, min: 0 }, // New field (CFU/g)
  enzymeActivity: { type: Number, min: 0 }, // New field (mg/kg/hr)
  soilComposition: {
    sand: { type: Number, min: 0, max: 100 },
    clay: { type: Number, min: 0, max: 100 },
    loam: { type: Number, min: 0, max: 100 },
  },
});

// Define the Ledger schema
const ledgerSchema = new mongoose.Schema({
  farmerName: {
    type: String,
    required: true
    },
    pincode: {
    type: String,
    required: true
    },
    aadharNumber: {
    type: String,
    required: true,
    },
    contactNumber: {
    type: String,
    required: true
    },
    areaPloughed: {
    type: Number,
    required: true
    },
    season: {
    type: String,
    required: true
    },
    cropGrown: {
    type: String,
    required: true
    },
    seedsUsed: {
    type: String,
    required: true
    },
    seedSownDate: {
    type: Date,
    required: true
    },
    transplanting: {
    type: String,
    required: true,
    },
    irrigationMethod: {
    type: String,
    required: true,
    },
    fertilizersUsed: {
    type: String,
    required: true,
    },
    harvestingDate: {
    type: Date,
    required: true
    },
    yield: {
    type: String,
    required: true
    },
    soilTests: [SoilTestSchema],
});

// Export the Ledger model
module.exports = mongoose.model("Ledger", ledgerSchema);