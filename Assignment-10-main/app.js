const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
const studentRouter = require('./routes/studentRouter');
const courseRouter = require('./routes/courseRouter');

const app = express();
const PORT = 8080;

app.use(express.json());

// Use routers
app.use('/students', studentRouter);
app.use('/courses', courseRouter);

// Connect to MongoDB and start the server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.log('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
