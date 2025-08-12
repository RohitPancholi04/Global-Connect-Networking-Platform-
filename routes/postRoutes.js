const express = require('express');
const protect = require('../middleware/authMiddleware');
const Post = require("../models/Post");
const upload = require("../middleware/uploadMiddleware");
const { createPost, getFeed, likePost, commentPost } = require('../controllers/postController');
// const auth = require("../middleware/authMiddleware.js");


const router = express.Router();

router.post('/', protect, upload.single('image'), createPost); 
router.get('/feed', protect, getFeed);
router.put('/:id/like', protect, likePost);
router.post('/:id/comment', protect, commentPost);

module.exports = router;
