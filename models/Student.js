const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    urn: { type: String, unique: true },
    age: Number,
    phone: String,
    email: String,
    fatherName: String,
    college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
    event: String,
    idImage: String
});

module.exports = mongoose.model('Student', studentSchema);