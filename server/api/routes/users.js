const router = require('express').Router();
const UserController = require('../controllers/user');

router.get('/', (req, res) => {
    res.json({ USERS: 'USERS' });
});

router.post('/signup', UserController.create_user);

module.exports = router;
