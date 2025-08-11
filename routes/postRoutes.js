const express = require('express');
const protect = require('../middleware/authMiddleware');
const multer = require('multer');
const Post = require("../models/Post");
// const upload = require("../middleware/uploadMiddleware");
const { createPost, getFeed, likePost, commentPost } = require('../controllers/postController');
const auth = require("../middleware/authMiddleware.js");
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/', auth, upload.single('image'), createPost); 
router.get('/feed', auth, getFeed);
router.put('/:id/like', protect, likePost);
router.post('/:id/comment', protect, commentPost);

module.exports = router;
