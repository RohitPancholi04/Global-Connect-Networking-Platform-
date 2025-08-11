const express = require("express");
const router = express.Router();
const {
  createJob,
  getJobs,
  applyJob,
  saveJob,
  closeJob
} = require("../controllers/jobController");

const  protect  = require("../middleware/authMiddleware"); // middleware for auth

// Routes
router.post("/", protect, createJob);           // Create job
// console.log({ createJob, getJobs, applyJob, saveJob, closeJob });
// console.log({ protect });

router.get("/", getJobs);                       // Get all jobs
router.post("/:id/apply", protect, applyJob);   // Apply for a job
router.post("/:id/save", protect, saveJob);     // Save a job
router.put("/:id/close", protect, closeJob);    // Close a job

module.exports = router;
