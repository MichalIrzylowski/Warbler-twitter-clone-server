const db = require("../models");

// api/users/:id/messages
exports.createMessage = async function (req, res, next) {
  try {
    let message = await db.Message.create({
      text: req.body.text,
      user: req.params.id
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.messages.push(message.id);
    await foundUser.save();
    let foundMessage = await db.Message.findById(message.id).populate('user', {
      username: true,
      profileImgUrl: true
    });
    console.log(foundMessage);
    return res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};

exports.getMessage = async function (req, res, next) {
  try {
    let message = await db.Message.find(req.params.message._id);
    return res.status(200).json(message);
  } catch (err) {
    return next(err);
  }
};

exports.deleteMessage = async function (req, res, next) {
  try {
    let foundMessage = db.Message.findById(req.params.message_id);
    await foundMessage.remove();
    return res.status(200).json();
  } catch (err) {
    return next(err);
  }
};