const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const fs = require('fs');

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
    if (req.fileValidationError) {
        console.log('Error: ', req.fileValidationError);
        res.status(400).json({
            error: 'FILE MUST BE AN IMAGE',
            success: false,
        });
    }
    let fname;
    if (req.file) {
        fname =
            'uploads/' +
            new Date().getTime() +
            req.userData.username.split(' ').join('') +
            req.file.originalname.split(' ').join('');
        fs.renameSync(req.file.path, fname);
    }
    console.log('Line 76', req.body, fname, req.file);
    const upadateProps = {
        ...req.body,
        ...(fname && { imgUrl: fname.substr(7) }),
    };
    User.findOneAndUpdate({ email: req.userData.email }, { $set: upadateProps }, { new: true })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Updating details',
                userData: req.userData,
                body: req.body,
                filename: fname,
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
