const router = require('express').Router();
const authController = require('../controllers/auth.controller');

// const authMiddleware = require('../middlewares/auth.middleware');

/* Auth */

router.get('/register', authController.register);
router.post('/register', authController.doRegister);

// REGISTER CON MIDDLEWARE
// router.get('/register', authMiddleware.isUnauthenticated, authController.register);
// router.post('/register', authMiddleware.isUnauthenticated, authController.doRegister);

// post register con avatar
// router.post('/register', authMiddleware.isUnauthenticated, upload.single('avatar'), authController.doRegister);

router.get('/login', authController.login);
router.post('/login', authController.doLogin);

// LOGIN CON MIDDLEWARE
// router.get('/login', authMiddleware.isUnauthenticated, authController.login);
// router.post('/login', authMiddleware.isUnauthenticated, authController.doLogin);

// router.get('/logout', authMiddleware.isAuthenticated, authController.logout);

// router.get('/login/google', authMiddleware.isUnauthenticated, authController.loginGoogle);
// router.get('/authenticate/google/cb', authMiddleware.isUnauthenticated, authController.doLoginGoogle);

module.exports = router;