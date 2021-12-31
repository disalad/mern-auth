// 3rd party packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const path = require('path');
const cookie = require('cookie');

const cookieParser = require('cookie-parser');
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
app.use(cookieParser());
app.use(
    cors({
        origin: true,
        methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
        credentials: true,
        exposedHeaders: ['set-cookie'],
    })
);

app.use(morgan('dev'));

app.get('/c', (req, res, next) => {
    console.warn('TEST');
    res.setHeader('Set-Cookie', cookie.serialize('TOKEN', 'AA', { httpOnly: true }));
    res.status(201).json({ message: 'COOKIE SET' });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/uploads'));

// app.get('/', (req, res) => {
//     res.setHeader('Set-Cookie', cookie.serialize('foo', 'bar', { httpOnly: true }));
//     res.status(201).json({ message: 'Cookie setted' });
// });

app.use('/users', usersRoute);
app.use('/auth', authRoute);

app.use((req, res, next) => {
    res.status(404).json({ message: 'URL Not Found' });
});

module.exports = app;
