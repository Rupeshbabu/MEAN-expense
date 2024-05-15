const express = require('express');
const { protect } = require('../controllers/authController');
const { addWallet, getWalletDetails } = require('../controllers/walletController');
const router = express.Router();

router.route('/:id').get(getWalletDetails).post(addWallet);



module.exports = router;