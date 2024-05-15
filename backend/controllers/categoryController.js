const Category = require('../models/categoryModel');

exports.addCategory = async (req, res, next) => {
    try {
        const category = await Category.create(req.body);

        return res.status(201).json({
            status: 'success',
            message: 'Category Added Successfully.',
            data: {
                category
            }
        });
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            error: error
        });
    }
}

exports.getCategoryById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).json({
                status: 'fail',
                message: 'User Not Found!'
            });
        }
        const categoryList = await Category.find({ userId: userId });

        return res.status(200).json({
            status: 'success',
            data: {
                categoryList
            }
        });
    } catch (error) {

    }
}
