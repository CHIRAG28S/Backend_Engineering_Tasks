const express = require('express');
const Student = require('../models/studentcourseschema');
const router = express.Router();

// 1. Create a new student
router.post('/', async (req, res) => {
    try {
        const { name, age, grade, courses = [] } = req.body;

        const student = new Student({ name, age, grade, courses });
        await student.save();

        res.status(201).json({
            message: 'Student added successfully!',
            student,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while adding the student', error: err.message });
    }
});

// 2. Retrieve all students with populated course details
router.get('/', async (req, res) => {
    try {
        const studentData = await Student.find().populate('courses');
        res.status(200).json({ data: studentData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching students', error: error.message });
    }
});

// 3. Retrieve a single student by ID with populated course details
router.get('/:id', async (req, res) => {
    try {
        const studentData = await Student.findById(req.params.id).populate('courses');
        if (!studentData) {
            return res.status(404).json({ message: 'Student does not exist' });
        }
        res.status(200).json({ data: studentData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching the student', error: error.message });
    }
});

// 4. Update a student by ID
router.patch('/:id', async (req, res) => {
    try {
        const studentData = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Ensures the updated document is returned
        ).populate('courses');

        if (!studentData) {
            return res.status(404).json({ message: 'Student does not exist' });
        }
        res.status(200).json({ message: 'Student updated successfully!', data: studentData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the student', error: error.message });
    }
});

// 5. Delete a student by ID
router.delete('/:id', async (req, res) => {
    try {
        const studentData = await Student.findByIdAndDelete(req.params.id);
        if (!studentData) {
            return res.status(404).json({ message: 'Student does not exist' });
        }

        res.status(200).json({ message: 'Student deleted successfully!', data: studentData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the student', error: error.message });
    }
});

module.exports = router;
