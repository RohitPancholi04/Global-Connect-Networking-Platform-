
const User = require("../models/User");
const Job = require("../models/Job");
const Post = require("../models/Post");

exports.globalSearch = async (req, res) => {
  try {
    const { query, skills, location, experience } = req.query;

    const userQuery = {};
    const jobQuery = {};
    const postQuery = {};

    if (query) {
      userQuery.name = { $regex: query, $options: "i" };
      jobQuery.title = { $regex: query, $options: "i" };
      postQuery.content = { $regex: query, $options: "i" };
    }

    if (skills) {
      const skillArray = skills.split(",");
      userQuery.skills = { $in: skillArray };
      jobQuery.skills = { $in: skillArray };
    }

    if (location) {
      userQuery.location = { $regex: location, $options: "i" };
      jobQuery.location = { $regex: location, $options: "i" };
    }

    if (experience) {
      userQuery.experience = { $gte: Number(experience) };
    }

    const users = await User.find(userQuery);
    const jobs = await Job.find(jobQuery);
    const posts = await Post.find(postQuery);

    res.json({ users, jobs, posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
