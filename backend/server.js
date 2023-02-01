const express = require('express');
const color = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db')
const PORT = process.env.PORT || 8000;

// Connect to databse
connectDB();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).json({ message: `Hello from port ${PORT}` })
});

// Routes
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));