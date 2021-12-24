const jwt = require('jsonwebtoken');
const UserSchema = require('../models/user');

exports.create_user = (req, res, next) => {
    console.log(req.body);
    res.json({ TEST: 'TEST' });
};
