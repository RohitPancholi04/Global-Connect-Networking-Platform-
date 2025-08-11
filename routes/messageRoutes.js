const express = require('express');
const protect = require('../middleware/authMiddleware');
const { sendMessage, getMessages, getUserForMessaging } = require('../controllers/messageController');
const upload = require('../middleware/uploadMiddleware');


const router = express.Router();

router.get("/user-profile",protect, getUserForMessaging);
router.post('/', protect, upload.single("image"), sendMessage);
router.get('/:userId', protect, getMessages);

module.exports = router;
