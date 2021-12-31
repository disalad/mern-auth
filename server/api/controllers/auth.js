const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.check_auth = async (req, res, next) => {
    try {
        // Verify credentials
        const token = req.cookies.JWT_ACCESS_TOKEN;
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        const userData = await User.findOne({ email: decoded.email });
        if (!userData) throw new Error();

        // Send response
        const filtered = ['email', 'imgUrl', 'username'].reduce(
            (result, key) => ({ ...result, [key]: userData[key] }),
            {}
        );
        req.userData = userData;
        res.status(201).json({ message: 'Auth success', user: filtered });
    } catch (error) {
        res.status(401).json({ message: 'Auth failed' });
    }
};
