const router = require('express').Router();
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/checkAuth');

router.get('/', (req, res) => {
    res.status(204).json({ USERS: 'USERS' });
});

router.post('/login', checkAuth);

router.post('/signup', checkAuth, UserController.create_user);

module.exports = router;
