const mongoose = require('mongoose');

const expenseHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    titles
}, { timestamps: true });