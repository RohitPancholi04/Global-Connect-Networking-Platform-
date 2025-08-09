const express = require('express');
const protect = require('../middleware/authMiddleware');
const { getUserProfile, updateProfile, sendConnectionRequest, acceptConnectionRequest } = require('../controllers/userController');

const router = express.Router();

router.get('/:id', protect, getUserProfile);
router.put('/update', protect, updateProfile);
router.post('/connect/:id', protect, sendConnectionRequest);
router.post('/accept/:id', protect, acceptConnectionRequest);

module.exports = router;
