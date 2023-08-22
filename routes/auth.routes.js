const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const adminVerification = require('../middlewares/role.middleware')


const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../config/multer.config');

/* Auth */

router.get('/register', authMiddleware.isUnauthenticated, authController.register);
router.post('/register', authMiddleware.isUnauthenticated, upload.single('avatar'), authController.doRegister);


//admin
router.get('/registerAdmin', adminVerification.isAdmin  ,authController.registerAdmin);
router.post('/registerAdmin', adminVerification.isAdmin  ,upload.single('avatar'), authController.doRegisterAdmin);
router.get('/users', adminVerification.isAdmin  ,authController.usersList);
router.get('/users/:id', adminVerification.isAdmin  ,authController.detailUser);
router.get('/users/:id/delete', adminVerification.isAdmin  ,authController.delete);
router.get('/users/:id/edit', adminVerification.isAdmin  ,authController.edit);
router.post('/users/:id/edit', adminVerification.isAdmin  ,upload.single('avatar'), authController.doEdit);





router.get('/login', authMiddleware.isUnauthenticated, authController.login);
router.post('/login', authMiddleware.isUnauthenticated, authController.doLogin);

//activate
router.get('/users/:id/activate', authController.activate);

router.get('/logout', authMiddleware.isAuthenticated, authController.logout);

router.get('/login/google', authMiddleware.isUnauthenticated, authController.loginGoogle);
router.get('/authenticate/google/cb', authMiddleware.isUnauthenticated, authController.doLoginGoogle);

module.exports = router;