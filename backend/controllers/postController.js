
const fs = require("fs");
const Post = require("../models/Post");
const connectCloudinary = require("../config/cloudinary");

// Create post
exports.createPost = async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const uploaded = await connectCloudinary().uploader.upload(req.file.path, {
        folder: "posts",
      });
      imageUrl = uploaded.secure_url;
      try { fs.unlinkSync(req.file.path); } catch (_) {}
    }

    const newPost = await Post.create({
      user: req.user._id,
      content: req.body.content,
      image: imageUrl,
    });

    const populated = await newPost.populate("user", "name profilePic");
    res.status(201).json(populated);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: error.message });
  }
};

// Feed visible to everyone
exports.getFeed = async (_req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "name profilePic")
      .populate("comments.user", "name profilePic")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching feed:", error);
    res.status(500).json({ message: error.message });
  }
};


// Toggle Like Post
exports.toggleLikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user._id.toString();
    const hasLiked = post.likes.some(id => id.toString() === userId);

    if (hasLiked) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json({
      likes: post.likes,
      likesCount: post.likes.length
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Add comment
exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Comment text required" });
    }

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ user: req.user._id, text });
    await post.save();

    await post.populate("user", "name profilePic");
    await post.populate("comments.user", "name profilePic");

    res.json(post);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete comment (owner only)
exports.deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const idx = post.comments.findIndex((c) => c._id.toString() === commentId);
    if (idx === -1) return res.status(404).json({ message: "Comment not found" });

    if (post.comments[idx].user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    post.comments.splice(idx, 1);
    await post.save();

    await post.populate("user", "name profilePic");
    await post.populate("comments.user", "name profilePic");

    res.json(post);
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete post (owner only)
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: error.message });
  }
};
