const mongoose = require('mongoose');
const { Schema } = mongoose;

// Import the Course model
const Course = require('./courseSchema');

// Define the Student schema
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    grade: { type: String, required: true },
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }], // Reference the Course model
});

// Export the Student model
module.exports = mongoose.models.Student || mongoose.model('Student', studentSchema);
