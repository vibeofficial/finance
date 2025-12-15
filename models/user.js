const { timeStamp } = require('console');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, trim: true, index: true },
  email: { type: String, unique: true, trim: true, lowercase: true },
  password: { type: String }
}, { timeStamp: true });

const userModel = model('users', userSchema);

module.exports = userModel;