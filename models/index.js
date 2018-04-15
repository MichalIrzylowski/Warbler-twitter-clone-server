const mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/warbler', {
  keepAlive: true,
  //debuging stuff
});

module.exports.User = require("./user");
module.exports.Message = require("./message");
