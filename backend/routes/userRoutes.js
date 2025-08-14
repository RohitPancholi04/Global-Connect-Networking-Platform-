const express = require('express');
const protect = require('../middleware/authMiddleware');
const { getUserProfile, updateProfile,addEducation,addExperience, sendConnectionRequest, acceptConnectionRequest } = require('../controllers/userController');

const router = express.Router();

router.get('/:id', protect, getUserProfile);
router.put('/update', protect, updateProfile);
router.post('/connect/:id', protect, sendConnectionRequest);
router.post('/accept/:id', protect, acceptConnectionRequest);
router.post("/experience", protect, addExperience);
router.post("/education", protect, addEducation);

module.exports = router;
