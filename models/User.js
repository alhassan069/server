const mongoose = require('mongoose');
// USER SCHEMA
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('UserSchema', userSchema);