const router = require('express').Router();
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/checkAuth');
const multer = require('multer');

// Configuration for Multer
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            console.log(req.body.fname);
            cb(null, 'file' + file.originalname);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes('image/')) {
            cb(null, true);
        } else {
            req.fileValidationError = true;
            cb(null, false);
        }
    },
});

// Routes
router.get('/', (req, res) => {
    res.status(204).json({ USERS: 'USERS' });
});

router.post('/login', checkAuth);

router.post('/signup', UserController.create_user);

router.post('/edit', checkAuth, upload.single('dp'), UserController.edit_details);

module.exports = router;
