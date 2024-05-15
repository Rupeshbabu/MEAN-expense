const express = require('express');
const { addExpense, getExpenseHistoryById, updateExpense } = require('../controllers/expenseController');

const router = express.Router();

router.route('/:id').post(addExpense).get(getExpenseHistoryById).patch(updateExpense);

module.exports = router;