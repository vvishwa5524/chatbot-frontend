require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const uploadRoutes = require('./routes/uploadRoutes');
const chatRoutes = require('./routes/chatRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect Database
connectDB();

// Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => res.send('API Running'));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));