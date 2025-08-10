const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { connect } = require('mongoose');
const connectCloudinary = require('./config/cloudinary');
const { app,httpServer } = require('./config/socket');

dotenv.config();
connectDB();
connectCloudinary();


// const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
