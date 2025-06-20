const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Diagnostic logging
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.originalUrl}`);
  next();
});

// Test route
app.get('/api/test', (req, res) => {
  console.log('✅ Test route hit');
  res.json({ message: '✅ Backend is working!' });
});

// Route imports
try {
  const authRoutes = require('./routes/auth');
  const jobRoutes = require('./routes/jobs');
  app.use('/api/auth', authRoutes);
  app.use('/api/jobs', jobRoutes);
  console.log('✅ Routes mounted successfully');
} catch (err) {
  console.error('❌ Route mounting failed:', err.message);
}

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});