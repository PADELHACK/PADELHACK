const router = require('express').Router();
const authController = require('../controllers/auth.controller');

const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../config/multer.config');

/* Auth */

router.get('/register', authMiddleware.isUnauthenticated, authController.register);
router.post('/register', authMiddleware.isUnauthenticated, upload.single('avatar'), authController.doRegister);

router.get('/registerAdmin', authController.registerAdmin);


router.get('/login', authMiddleware.isUnauthenticated, authController.login);
router.post('/login', authMiddleware.isUnauthenticated, authController.doLogin);

//activate
router.get('/users/:id/activate', authController.activate);

router.get('/logout', authMiddleware.isAuthenticated, authController.logout);

router.get('/login/google', authMiddleware.isUnauthenticated, authController.loginGoogle);
router.get('/authenticate/google/cb', authMiddleware.isUnauthenticated, authController.doLoginGoogle);

module.exports = router;