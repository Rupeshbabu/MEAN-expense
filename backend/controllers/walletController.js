const Wallet = require('../models/walletModel');
const User = require('../models/userModel');
const WalletHistory = require('../models/walletHistoryModel');
const APIFeatures = require('../utils/apiFeatures');


exports.addWallet = async (req, res, next) => {

    const userId = req.params.id;

    // Find the previous amount in the wallet
    const checkPrevAmount = await Wallet.findOne({ userId });

    // Create a wallet history entry
    const walletHistoryObj = {
        userId,
        currentAmount: req.body.currentAmount,
        prevAmount: checkPrevAmount.amount,
        paymentType: 'credit'
    };
    const walletHistory = await WalletHistory.create(walletHistoryObj);

    // Add the current amount to the wallet balance
    const addBalance = req.body.currentAmount;
    const walletBal = await Wallet.findOneAndUpdate(
        { userId },
        { $inc: { amount: addBalance } },
        { new: true, upsert: true }
    );

    return res.status(200).json({
        status: 'success',
        message: 'Successfully added money to wallet',
        data: {
            availableBalance: walletBal.amount // Return the updated balance
        }
    });

}

exports.getWalletDetails = async (req, res, next) => {
    const userId = req.params.id;
    try {
        // Fetch user
        // const user = await User.findById(userId);
        // if (!user) {
        //     return res.status(404).json({ error: 'User not found' });
        // }

        // Fetch wallet
        const wallet = await Wallet.findOne({ userId: userId });
        if (!wallet) {
            return res.status(404).json({ error: 'Wallet not found' });
        }

        // Fetch wallet history
        const walletHistory = await WalletHistory.find({ userId: userId })
            .sort({ dateofTrans: -1 })


        // Combine results
        const userData = {
            wallet: wallet,
            walletHistory: walletHistory
        };

        res.status(200).json(userData);
        // res.status(200).json({
        //     status: 'success',
        //     data: {
        //         result
        //     }
        // })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred', err: error });
    }
}