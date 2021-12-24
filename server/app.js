// 3rd party packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
require('dotenv').config();

// Routes
const usersRoute = require('./api/routes/users');

// DB init
mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('CONNECTED TO MONGODB');
});

// Middleware
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', usersRoute);

app.use((req, res, next) => {
    res.status(404).json({ message: 'URL Not Found' });
});

module.exports = app;
