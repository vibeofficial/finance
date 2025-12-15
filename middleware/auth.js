const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const catchAsync = require('../middleware/catchAsync');
const appError = require('../utils/appError');
const secret = process.env.SECRET;


exports.authenticate = catchAsync(async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return next(new appError('Token not passed to headers', 404))
  const token = auth.split(' ')[1];
  if (!token) return next(new appError('Token not found', 404))
  const decodedToken = jwt.verify(token, secret);
  const { id } = decodedToken;
  const user = await userModel.findById(id);
  if (!user) return next(new appError('User not found', 404))
  req.user = decodedToken;
  next();
});


exports.authorize = catchAsync(async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return next(new appError('Token not passed to headers', 404))
  const token = auth.split(' ')[1];
  if (!token) return next(new appError('Token not found', 404))
  const decodedToken = jwt.verify(token, secret);
  const { id } = decodedToken;
  const user = await userModel.findById(id);
  if (!user) return next(new appError('User not found', 404));
  if (user.role !== 'admin') return next(new appError('Unauthorized: Contact Admin', 401));
  req.user = decodedToken;
  next();
});