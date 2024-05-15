const Expense = require('../models/expenseModel');
const Wallet = require('../models/walletModel');
const WalletHistory = require('../models/walletHistoryModel');

exports.addExpense = async (req, res, next) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({
            status: 'fail',
            message: 'User not found!'
        });
    }
    req.body.userId = userId;
    await Expense.create(req.body);
    const checkBalance = await Wallet.findOne({ userId: userId });

    const walletHistoryObj = {
        userId: userId,
        currentAmount: req.body.amount,
        prevAmount: checkBalance.amount,
        paymentType: 'debit'
    }
    const createExpense = await WalletHistory.create(walletHistoryObj);
    const walletBal = await Wallet.findOneAndUpdate(
        { userId },
        { $inc: { amount: -req.body.amount } },
        { new: true, upsert: true }
    );

    return res.status(201).json({
        status: 'success',
        message: 'Successfully added expense.',
        data: {
            availableBalance: walletBal.amount
        }
    })

}

exports.getExpenseHistoryById = async (req, res, next) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({
            status: 'fail',
            message: 'User not found!'
        });
    }

    const expense = await Expense.find({ userId: userId }).sort({ dateOfTrans: -1 });

    return res.status(200).json({
        status: 'success',
        data: {
            expense
        }
    })

}

exports.updateExpense = async (req, res, next) => {
    const userId = req.body.userId;
    const expenseId = req.params.id;
    if (!expenseId) {
        return res.status(400).json({
            status: 'fail',
            message: 'Expense record not found!'
        });
    }

    const expense = await Expense.findByIdAndUpdate(expenseId, req.body, { new: true, runValidators: true });
    const checkBalance = await Wallet.findOne({ userId: userId });

    const walletHistoryObj = {
        _id: checkBalance._id,
        currentAmount: req.body.amount,
        prevAmount: checkBalance.amount,
        paymentType: 'debit'
    }
    const createExpense = await WalletHistory.findByIdAndUpdate(walletHistoryObj);

    //  User enter gt exist value, we will minus exisiting value minus current value in wallet
    //  user enter lt exist value, we will plus exisiting value plus current value in wallet
    var walletBal = '';
    if (req.body.amount > checkBalance.amount) {
        walletBal = await Wallet.updateOne(
            { userId },
            { $set: { amount: req.body.amount - checkBalance.amount } },
        );
    } else if (req.body.amount < checkBalance.amount) {
        walletBal = await Wallet.updateOne(
            { userId },
            { $set: { amount: req.body.amount + checkBalance.amount } },
        );
    } else {
        return res.status(400).send('Entered value is equal to the existing value');
    }

    return res.status(200).json({
        status: 'success',
        message: 'Expense has been updated.',
        data: {
            availableBalance: walletBal.amount
        }
    })
}
