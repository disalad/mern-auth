const router = require('express').Router();
const AuthController = require('../controllers/auth');

router.get('/', AuthController.check_auth);

module.exports = router;
