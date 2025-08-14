const Post = require('../models/Post');
const connectCloudinary = require('../config/cloudinary');
//
const fs = require('fs');
exports.createPost = async (req,res) => {
  try {
    // const fun = await connectCloudinary.uploader
    console.log(connectCloudinary());
    
    const imageUrl = req.file ? await connectCloudinary().uploader.upload(req.file.path) : "";
    console.log(imageUrl);
    const newPost = await Post.create({
      user: req.user._id,
      content: req.body.content,
      image:imageUrl.url
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error creating post:", error);
  }
};

exports.getFeed = async (req, res) => {
  try {
    const posts = await Post.find({ user: { $in: [...req.user.connections, req.user._id] } })
      .populate('user', 'name profilePic')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.likes.includes(req.user._id)) {
      post.likes = post.likes.filter(id => id.toString() !== req.user._id.toString());
    } else {
      post.likes.push(req.user._id);
    }
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({ user: req.user._id, text: req.body.text });
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
