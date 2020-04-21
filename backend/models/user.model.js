const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {type: String, required: true, unique: true, trim: true, minlength: 3},
}, {
  timestamps: true,
});

const User = mongoose.model('User', schema);

module.exports = User;