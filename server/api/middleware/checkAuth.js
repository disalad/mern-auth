const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.trim();
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed',
        });
    }
};
