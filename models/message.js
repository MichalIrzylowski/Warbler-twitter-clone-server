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

messageSchema.pre('remove', async function (next) {
  try {
    //find a user
    let user = await User.findById(this.user);
    //remove message form their messages list
    user.messages.remove(this.id);
    //save user
    await user.save();
    //return next
    return next();
  } catch (err) {
    return next(err);
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;