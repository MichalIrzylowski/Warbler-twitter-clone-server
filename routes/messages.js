const express = require("express"),
      router = express.Router({mergeParams: true});
      
const {createMessage} = require("../handlers/messages.js");

router.route('/').post(createMessage);

module.exports = router;