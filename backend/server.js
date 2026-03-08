require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const backendRandomValue = process.env.BACKEND_RANDOM_VALUE || 'not-set';

// Middleware
app.use(express.json());
app.use(cors());

// Health check route
app.get('/health', (req, res) => {
  console.log('Health check requested');
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Basic test route
app.get('/api/test', (req, res) => {
  console.log('Test route accessed');
  res.status(200).json({
    message: 'Server is running',
    version: '1.0.0',
    randomValue: backendRandomValue
  });
});

// Returns the random value configured in backend/.env
app.get('/api/random', (req, res) => {
  console.log('Random value route accessed');
  res.status(200).json({
    randomValue: backendRandomValue
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
