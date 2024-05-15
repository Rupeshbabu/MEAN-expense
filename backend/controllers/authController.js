const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const Wallet = require('../models/walletModel');
const walletHistory = require("../models/walletHistoryModel");


exports.signUp = async (req, res) => {

  const newUser = await User.create(req.body);

  const wallet = await Wallet.create({ userId: newUser._id, amount: 0 });

  const wallethistory = await walletHistory.create({
    userId: newUser._id,
    currentAmount: wallet.amount,
    prevAmount: 0,
    paymentType: 'opening'
  })
  // await newUser.save();

  return res.status(201).json({
    status: "success",
    message: "User Creation Success",
  });
};

exports.signIn = async (req, res) => {
  try {
    let username = await User.findOne({ email: req.body.email });
    if (!username) {
      return res.status(400).json({
        status: "fail",
        message: "Email Address not found!",
      });
    }
    const isCheckPassword = await bcrypt.compare(
      req.body.password,
      username.password
    );
    if (!isCheckPassword) {
      return res.status(400).json({
        status: "fail",
        message: "Password incorrect!",
      });
    }

    const token = jwt.sign({
      id: username.id,
      username: username.username,
      role: username.role,
      email: username.email,
      isEmail: username.isEmail,
      isActive: username.isActive,
    },
      process.env.JWT_TOKEN);

    return res.cookie("access_token", token, { httpOnly: true }).status(200).json({
      status: 'success',
      message: "Login Success :)",
      token: token,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      message: 'Login faild!!',
      error: error
    })
  }
};

exports.protect = async (req, res, next) => {
  // 1. Getting token and check of it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'Your are not logged in! Please log and get access'
    });
  }

  // 2. Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user still exists
  const currentUser = await User.findById(decoded.user._id);
  if (!currentUser) {
    return res.status(401).json({
      status: 'fail',
      message: 'The User belonging to this token does no longer exist'
    });

  }

  // 4. Check if user changed password after the token was issued
  // if (currentUser.changePasswordAfter(decoded.iat)) {
  //     return next(new AppError('User recently changed password! Please login again', 401));
  // }

  //GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;

  next();
};

exports.forgotPwd = async (req, res) => { };
exports.resetPwd = async (req, res) => { };

