
const express = require("express");
const router = express.Router();
const protect  = require("../middleware/authMiddleware.js");
const upload = require("../middleware/uploadMiddleware"); // your multer config

const {
  createPost,
  getFeed,
  toggleLikePost,
  addComment,
  deleteComment,
  deletePost,
} = require("../controllers/postController.js");

router.post("/", protect, upload.single("image"), createPost);
router.get("/feed", protect, getFeed);

router.put("/:postId/like", protect, toggleLikePost);

router.post("/:postId/comment", protect, addComment);
router.delete("/:postId/comment/:commentId", protect, deleteComment);

router.delete("/:postId", protect, deletePost);

module.exports = router;

