const express = require("express"),
      router = express.Router({mergeParams: true});
      
const {createMessage, getMessage, deleteMessage} = require("../handlers/messages.js");

router.route('/').post(createMessage);
router
    .route('/:message_id')
    .get(getMessage)
    .delete(deleteMessage);


module.exports = router;