const express = require('express');
const Course = require('../models/courseSchema');
const Student = require('../models/studentcourseschema');
const router = express.Router();

// 1. Add a new course
router.post('/', async (req, res) => {
    try {
        const { name, description, duration } = req.body;

        const newCourse = new Course({ name, description, duration });
        const savedCourse = await newCourse.save();

        res.status(201).json({ data: savedCourse });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// 2. Get all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json({ data: courses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// 3. Retrieve a course by ID (including students enrolled in it)
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('students', 'name'); // Assuming the Student model has a 'name' field
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json({ data: course });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// 4. Update a course by ID
router.put('/:id', async (req, res) => {
    try {
        const { name, description, duration } = req.body;
        
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            { name, description, duration },
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json({ data: updatedCourse });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

// 5. Delete a course by ID (removing it from students enrolled)
router.delete('/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Remove the course from all students enrolled in it (assuming students have a reference to the course)
        await Student.updateMany(
            { courses: req.params.id },
            { $pull: { courses: req.params.id } }
        );

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
