const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    date: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

module.exports = mongoose.model('Wallet', walletSchema);