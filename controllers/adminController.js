const College = require('../models/College');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');

exports.createCollege = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newCollege = await College.create({ name, email, password: hashedPassword });
        res.status(201).json(newCollege);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('college');
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};