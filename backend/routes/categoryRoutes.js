const express = require('express');
const { addCategory, getCategoryById } = require('../controllers/categoryController');

const router = express.Router();

router.route('/').post(addCategory);
router.route('/:id').get(getCategoryById);

module.exports = router;