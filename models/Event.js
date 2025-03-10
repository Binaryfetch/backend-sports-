const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: String,
    maxParticipants: Number,
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

module.exports = mongoose.model('Event', eventSchema);