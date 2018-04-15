const db = require("../models"),
      jwt = require("jsonwebtoken");

exports.signin = function () {
  
};

exports.signup = async function (req, res, next) {
  try {
    //create a user
    let user = await db.User.create(req.body);
    let {id, username, profileImgUrl} = user;
      //TOKEN - first we put some payload data (in object) like id, username and proflile img, than we put our secret key
    let token = jwt.sign({
      id,
      username,
      profileImgUrl
    }, process.env.SECRET_KEY);
    //create a token (signing a token)
    return res.status(200).json({
      id,
      username,
      profileImgUrl,
      token
    });
  } catch (err) {
    //if validation fails
    if (err.code === 11000) {
      err.message = 'Sorry, this email is already taken';
    }
    
    return next({
      status: 400,
      message: err.message
    });
    
  }
};