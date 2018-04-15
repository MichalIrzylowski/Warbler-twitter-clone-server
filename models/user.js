const mongoose = require("mongoose"),
      bcrypt = require("bcrypt");
      
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profileImgUrl: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
