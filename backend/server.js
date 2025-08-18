const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const connectCloudinary = require('./config/cloudinary');
const { app,httpServer } = require('./config/socket');

dotenv.config();
connectDB();
connectCloudinary();


//Middleware 
app.use(cors({origin: "https://global-connect-networking-platform-doty.onrender.com", credentials: true}));
app.use(express.json({ limit: "10mb" }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/api/admin',require('./routes/adminRoutes'))



const PORT = process.env.PORT || 5003;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));



