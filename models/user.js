const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: { type: String, trim: true, index: true, lowercase: true },
  email: { type: String, unique: true, trim: true, lowercase: true },
  password: { type: String },
  role: { type: String, default: 'user' }
}, { timestamps: true });

const userModel = model('users', userSchema);

module.exports = userModel;