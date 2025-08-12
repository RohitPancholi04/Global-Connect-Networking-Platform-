const express = require('express');
const dotenv = require('dotenv');
// const cors = require('cors');
const connectDB = require('./config/db');
const  connect  = require('mongoose');
const connectCloudinary = require('./config/cloudinary');
const { app,httpServer } = require('./config/socket');

dotenv.config();
connectDB();
connectCloudinary();


//Middleware 
// app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/admin',require('./routes/adminRoutes'))
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
