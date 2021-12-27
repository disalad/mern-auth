const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.create_user = (req, res, next) => {
    console.log(req.userData);
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                return res
                    .status(409)
                    .json({ message: 'Auth failed', credentials: req.body, success: false });
            }

            const accessToken = jwt.sign(
                { username: req.body.username, email: req.body.email },
                process.env.JWT_ACCESS_TOKEN
            );
            bcrypt
                .hash(req.body.password, 10)
                .then(hash => {
                    const user = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                        imgUrl: '/default_dp.png',
                    });
                    return user.save();
                })
                .then(result => {
                    res.status(201).json({
                        message: 'Auth successful',
                        success: true,
                        accessToken,
                    });
                })
                .catch(err => {
                    res.status(500).json({ message: err.message, success: false });
                });
        })
        .catch(err => {
            res.status(500).json({ message: err.message, success: false });
        });
};

exports.login_user = (req, res, next) => {
    console.log(req.userData);
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res
                    .status(409)
                    .json({ message: 'Auth failed', credentials: req.body, success: false });
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message, success: false });
        });
};

exports.edit_details = (req, res, next) => {
    console.log(req.body.email, { ...req.body.updateProps });
    User.findOneAndUpdate(
        { email: req.body.email },
        { $set: { ...req.body.updateProps } },
        { new: true }
    )
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Updating details',
                userData: req.userData,
                body: req.body,
            });
        })
        .catch(err => {
            console.log('Error: ', err.message);
            res.status(500).json({
                message: 'Update failed',
                error: err.message,
            });
        });
};
