require("dotenv").config();
const express = require("express"),
      app = express(),
      cors = require("cors"),
      bodyParser = require("body-parser");
      
const errorHandler = require("./handlers/error"),
      authRoutes = require("./routes/auth");
      
const PORT = 8081;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/auth', authRoutes);

app.use(function (req, res, next) {
  let err = new Error('Not found!');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function() {
  console.log(`App is listening on port: ${PORT}`);
});
