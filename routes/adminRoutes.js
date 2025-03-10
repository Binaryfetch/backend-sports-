const express = require('express');
const { createCollege, getAllStudents } = require('../controllers/adminController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');
const router = express.Router();
console.log("Admin Routes File Loaded");

router.post('/create-college', adminAuthMiddleware, createCollege);
router.get('/students', adminAuthMiddleware, getAllStudents);
module.exports = router;