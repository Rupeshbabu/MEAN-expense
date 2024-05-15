const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required']
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    dateOfTrans: {
        type: Date,
        required: [true, 'Date is required']
    },
    message: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);