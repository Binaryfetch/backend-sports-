const express = require('express');
const router = express.Router();
const { adminLogin, collegeLogin } = require('../controllers/authController');

console.log("Admin Routes File Loaded"); // Debugging

router.get('/test', (req, res) => {
    res.json({ message: "Admin Route Working" });
});

router.post('/admin-login', adminLogin);
router.post('/college-login', collegeLogin); 

console.log("Admin Routes Registered"); // Debugging
module.exports = router;
