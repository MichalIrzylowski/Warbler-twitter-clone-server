const mongoose = require("mongoose"),
      User = require("./user");
      
const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxLength: 160
  },
  //BELOW - user is an author of a message
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;