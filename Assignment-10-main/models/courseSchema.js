const mongoose = require('mongoose');

// Define the schema
const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    duration: { type: Number, required: true },
});

// Export the model or retrieve it if already defined
module.exports = mongoose.models.Course || mongoose.model('Course', courseSchema);
