const express = require('express');
const { getUserProfile, updateProfile,addEducation,addExperience, sendConnectionRequest, acceptConnectionRequest } = require('../controllers/userController');
const  protect  = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); 
const router = express.Router();

router.get('/:id', protect, getUserProfile);
router.put('/update', protect,upload.single("profilePic"), updateProfile);
router.post('/connect/:id', protect, sendConnectionRequest);
router.post('/accept/:id', protect, acceptConnectionRequest);
router.post("/experience", protect, addExperience);
router.post("/education", protect, addEducation);

module.exports = router;
