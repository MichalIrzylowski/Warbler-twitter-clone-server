require("dotenv").config();
const express = require("express"),
      app = express(),
      cors = require("cors"),
      bodyParser = require("body-parser");
      
const errorHandler = require("./handlers/error"),
      authRoutes = require("./routes/auth"),
      messagesRoutes = require("./routes/messages"),
      {loginRequired, ensureCorrectUser} = require("./middleware/auth"),
      db = require("./models");
      
const PORT = 8081;


app.use(cors());
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages',
        loginRequired,
        ensureCorrectUser,
        messagesRoutes);

app.get('/api/messages', loginRequired, async function (req, res, next) {
  try {
    let messages = await db.Message.find().sort({createdAt: 'desc'}).populate('user', {
      username: true,
      profileImgUrl: true
    });
    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
});

app.use(function (req, res, next) {
  let err = new Error('Not found!');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function() {
  console.log(`App is listening on port: ${PORT}`);
});
