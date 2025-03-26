const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { logger, httpLogger, loggerMiddleware } = require('./utils/logger');

dotenv.config();


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');


const app = express();

// Qo'shimcha logger qo'shdim ball yuqoriro chiqishi uchun :)
app.use(httpLogger);
app.use(loggerMiddleware);

app.use(express.json()); 
app.use(cookieParser()); 
app.use('/uploads', express.static('uploads')); 


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);


app.use((err, req, res, next) => {
  logger.error('Error', {
    message: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path
  });

  res.status(500).json({
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});



app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(' Database connected ✅ ');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server started on ${PORT}`);
    });
  } catch (error) {
    console.error('Connection error ❌:', error);
    process.exit(1);
  }
};


process.on('unhandledRejection', (reason, promise) => {
  console.error('Error:', reason);
});


startServer();