// 3rd party packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// Routes
const usersRoute = require('./api/routes/users');
const authRoute = require('./api/routes/auth');

// DB init
mongoose.connect(process.env.MONGODB_URI, () => {
    console.log('CONNECTED TO MONGODB');
});
mongoose.set('debug', true);

// Middleware
app.use(cors('*'));

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRoute);
app.use('/auth', authRoute);

app.use((req, res, next) => {
    res.status(404).json({ message: 'URL Not Found' });
});

module.exports = app;
