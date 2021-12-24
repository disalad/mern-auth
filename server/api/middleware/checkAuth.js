const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        req.userData = decoded;
        console.log('|||||||||||||||||||||AUTHENTICATION SUCCESS||||||||||||||||||||||');
        next();
    } catch (error) {
        console.log('-----------AUTHENTICATION FAILED-----------');
        next();
        // return res.status(401).json({
        //     message: 'Auth failed',
        // });
    }
};
