const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  skills: [String],
  location: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  status: { type: String, default: "open" } // open, closed
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);
