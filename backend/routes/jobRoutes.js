// const express = require("express");
// const router = express.Router();
// const {
//   createJob,
//   getJobs,
//   applyJob,
//   saveJob,
//   closeJob
// } = require("../controllers/jobController");

// const  protect  = require("../middleware/authMiddleware"); // middleware for auth

// // Routes
// router.post("/", protect, createJob);           // Create job
// // console.log({ createJob, getJobs, applyJob, saveJob, closeJob });
// // console.log({ protect });

// router.get("/", getJobs);                       // Get all jobs
// router.post("/:id/apply", protect, applyJob);   // Apply for a job
// router.post("/:id/save", protect, saveJob);     // Save a job
// router.put("/:id/close", protect, closeJob);    // Close a job

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const {
//   createJob,
//   getJobs,
//   applyJob,
//   saveJob,
//   closeJob,
// } = require("../controllers/jobController");

// const { protect } = require("../middleware/authMiddleware"); // 👈 destructure

// // router.post("/", protect, createJob);
// router.get("/", getJobs);
// router.post("/create", protect, createJob);


// router.post("/:id/apply", jobController.applyJob);
// router.post("/:id/save", protect, saveJob);
// router.put("/:id/close", protect, closeJob);


// module.exports = router;



const express = require("express");
const router = express.Router();
const {
  createJob,
  getJobs,
  applyJob,
  saveJob,
  closeJob,
} = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");

// Get all jobs
router.get("/", getJobs);

router.get("/filter", getJobs);



// Create a job
router.post("/create", protect, createJob);

// Apply to a job
router.post("/:id/apply", protect, applyJob);

// Save a job
router.post("/:id/save", protect, saveJob);

// Close a job
router.put("/:id/close", protect, closeJob);

module.exports = router;


