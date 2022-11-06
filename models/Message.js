const mongoose = require('mongoose');
// Message SCHEMA
const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true, },
    message: { type: String, required: true },
    status: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('MessageSchema', messageSchema);