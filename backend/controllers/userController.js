const User = require('../models/User');
const connectCloudinary = require('../config/cloudinary');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    let imageUrl = "";

    // If file uploaded → upload to Cloudinary
    if (req.file) {
      const cloudinary = connectCloudinary();
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "linkedin-clone/profiles"
      });
      imageUrl = result.secure_url;
    }

    // Gather fields from req.body
    const updates = { ...req.body };
    if (imageUrl) updates.profilePic = imageUrl;

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,   // from protect middleware
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Add education
exports.addEducation = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.education.push(req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add experience
exports.addExperience = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.experience.push(req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};



// Send connection request
exports.sendConnectionRequest = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) return res.status(404).json({ message: 'User not found' });

    if (targetUser.pendingRequests.includes(req.user._id)) {
      return res.status(400).json({ message: 'Request already sent' });
    }

    targetUser.pendingRequests.push(req.user._id);
    await targetUser.save();

    res.json({ message: 'Connection request sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept connection request
exports.acceptConnectionRequest = async (req, res) => {
  try {
    const requesterId = req.params.id;
    const user = await User.findById(req.user._id);

    if (!user.pendingRequests.includes(requesterId)) {
      return res.status(400).json({ message: 'No such request' });
    }

    user.pendingRequests = user.pendingRequests.filter(id => id.toString() !== requesterId);
    user.connections.push(requesterId);

    const requester = await User.findById(requesterId);
    requester.connections.push(user._id);

    await user.save();
    await requester.save();

    res.json({ message: 'Connection request accepted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
