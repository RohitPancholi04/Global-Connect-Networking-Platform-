const express = require('express');
const protect = require('../middleware/authMiddleware');
const multer = require('multer');
const { createPost, getFeed, likePost, commentPost } = require('../controllers/postController');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/', protect, upload.single('image'), createPost);
router.get('/feed', protect, getFeed);
router.put('/:id/like', protect, likePost);
router.post('/:id/comment', protect, commentPost);

module.exports = router;
