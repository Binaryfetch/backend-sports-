const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const adminRoutes = require('./routes/authRoutes'); // This contains admin login
const studentRoutes = require('./routes/studentRoutes');
const authRoutes = require('./routes/adminRoutes'); // This contains admin-related routes

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

console.log("Loading Routes...");

app.use('/api/auth', adminRoutes); // Admin login should be under '/api/auth'
app.use('/api/admin', authRoutes); // Admin functionalities like creating colleges

console.log("Routes Loaded");

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
