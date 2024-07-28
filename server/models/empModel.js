const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    phonenumber: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    designation: { type: String, required: true },
    courses: { type: [String], required: true },
    imageFile: { type: String, required: true },
    joinedDate: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model("Employee", empSchema);