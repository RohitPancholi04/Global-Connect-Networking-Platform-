const Job = require("../models/Job");

//  Create a new job
exports.createJob = async (req, res) => {
  try {
    const { title, description, skills, location } = req.body;

    const job = await Job.create({
      title,
      description,
      skills,
      location,
      postedBy: req.user._id, // requires auth middleware
    });

    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Get all jobs (with optional filters)
exports.getJobs = async (req, res) => {
  try {
    const { search, location, skills } = req.query;
    const query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (skills) {
      query.skills = { $in: skills.split(",") };
    }

    const jobs = await Job.find(query).populate("postedBy", "name email");
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Apply for a job
exports.applyJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });

    //Prevent duplicate applications
    if (job.applicants.includes(req.user._id)) {
      return res.status(400).json({ error: "Already applied" });
    }
    // Prevent applying to own job
    if (job.postedBy.toString() === req.user._id.toString()) {
      return res.status(400).json({ error: "You can't apply to your own job" });
    }


    job.applicants.push(req.user._id);
    await job.save();

    //   res.json({ message: "Applied successfully" });
    // } catch (err) {
    //   res.status(500).json({ error: err.message });
    // }
    res.status(200).json({ message: 'Applied successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Save a job
exports.saveJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });

    if (job.savedBy.includes(req.user._id)) {
      return res.status(400).json({ error: "Already saved" });
    }

    job.savedBy.push(req.user._id);
    await job.save();

    res.json({ message: "Job saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Close a job
exports.closeJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    job.status = "closed";
    await job.save();

    res.json({ message: "Job closed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
