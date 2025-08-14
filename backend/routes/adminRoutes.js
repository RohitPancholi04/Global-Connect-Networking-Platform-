const express = require('express');
const authAdmin = require('../middleware/authAdmin.js');
 const {loginAdmin, allUsers, allPosts } = require('../controllers/adminController.js');

const router = express.Router();

router.post('/login',loginAdmin);
router.get('/all-users',authAdmin,allUsers);
router.get('/all-posts',authAdmin,allPosts);

module.exports = router;