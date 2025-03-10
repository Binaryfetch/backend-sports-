const Student = require('../models/Student');
const cloudinary = require('../config/cloudinary');

exports.registerStudent = async (req, res) => {
    try {
        const { name, urn, age, phone, email, fatherName, college, event } = req.body;
        if (age >= 25) return res.status(400).json({ message: 'Age must be below 25' });

        const newStudent = await Student.create({ name, urn, age, phone, email, fatherName, college, event });
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};