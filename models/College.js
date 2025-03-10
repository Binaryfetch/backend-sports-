const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const collegeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
collegeSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
module.exports = mongoose.model('College', collegeSchema);