const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const College = require('../models/College'); // Ensure the correct model path

// ✅ Admin Login Function
const adminLogin = (req, res) => {
    try {
        console.log("📌 Admin Login Hit");
        console.log("📝 Request Body:", req.body);

        const { email, password } = req.body;

        // Fetch Admin credentials from environment variables
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (email === adminEmail && password === adminPassword) {
            const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            console.log("✅ Admin login successful!");
            return res.json({ message: 'Admin login successful', token });
        } else {
            console.log("❌ Invalid admin credentials");
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error("❌ Error in adminLogin:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ College Login Function
const collegeLogin = async (req, res) => {
    try {
        console.log("📌 College Login Hit");
        console.log("📝 Request Body:", req.body);

        const { email, password } = req.body;

        // Find college by email
        const college = await College.findOne({ email });

        if (!college) {
            console.log("❌ College Not Found for email:", email);
            return res.status(401).json({ message: "College not found" });
        }

        console.log("🔑 Stored Hashed Password:", college.password);
        console.log("🔓 Entered Plain Password:", password);

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, college.password);

        if (!isMatch) {
            console.log("❌ Password does not match!");
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ role: 'college', collegeId: college._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        console.log("✅ College login successful!");
        res.json({ message: "College login successful", token });

    } catch (error) {
        console.error("❌ Error in collegeLogin:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// ✅ Export functions
module.exports = { adminLogin, collegeLogin };
