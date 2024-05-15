const mongoose = require('mongoose');
const walletHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    currentAmount: {
        type: Number,
        required: [true, 'Current Amount is required']
    },
    prevAmount: {
        type: Number,
        required: [true, 'Previous Amount is required']
    },
    paymentType: {
        type: String,
        enum: ['debit', 'credit', 'opening']
    },
    dateofTrans: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('WalletHistory', walletHistorySchema);