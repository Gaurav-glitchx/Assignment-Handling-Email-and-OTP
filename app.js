const express = require('express');
const path = require('path');
const authRoutes = require('./src/routes/authRoutes');
const emailRoutes = require('./src/routes/emailRoutes');

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);

// Static files
app.use('/assets', express.static(path.join(__dirname, 'assets')));

module.exports = app;