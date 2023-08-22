const router = require('express').Router();
const userController = require('../controllers/user.controller');
const purchaseController = require('../controllers/purchases.controller')

router.get('/profile', userController.profile, purchaseController.listTickets);

module.exports = router;