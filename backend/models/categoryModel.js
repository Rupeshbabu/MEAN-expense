const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Category Name is Required']
    },
    isActive: {
        type: Boolean,
        default: true
    },
    message: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);