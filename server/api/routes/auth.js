const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.get('/', async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        const userData = await User.findOne({ email: decoded.email });
        req.userData = userData;
        res.status(201).json({ message: 'Auth success', user: userData });
    } catch (error) {
        res.status(401).json({ message: 'Auth failed' });
    }
});

module.exports = router;
