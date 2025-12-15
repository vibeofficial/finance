const userModel = require('../models/user');
const catchAsync = require('../middleware/catchAsync');
const appError = require('../utils/appError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  const existingUser = await userModel.findOne({ email: email.toLowerCase() });
  if (existingUser) return next(new appError('User already exist', 400));
  const hashPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
  const user = new userModel({ name, email, password: hashPassword });
  res.status(201).json({
    success: true,
    status: 'successful',
    message: 'User created successfully'
  })
});


exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email.toLowerCase() });
  if (!user) return next(new appError('Invalid Credentials', 400));
  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) return next(new appError('Invalid Credentials', 400));
  const accessToken = jwt.sign({ id: user._id }, secret, { expiresIn: '1d' });
  const refreshToken = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' });
  const { createdAt, updatedAt, __v, ...data } = user.toObject();
  res.status(200).json({
    success: true,
    status: 'successful',
    message: 'Login successful',
    data,
    accessToken,
    refreshToken
  })
});