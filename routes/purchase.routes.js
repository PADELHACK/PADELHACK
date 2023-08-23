const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/auth.middleware');
const purchaseController = require('../controllers/purchases.controller')

router.post('/purchase', authMiddleware.isAuthenticated, purchaseController.createTicket)
router.get('/purchase', authMiddleware.isAuthenticated, purchaseController.listTickets)

module.exports = router;

