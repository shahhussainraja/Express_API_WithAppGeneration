var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const req = require("express/lib/request");
const mongoose = require("mongoose");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
// app.set("views","./views");

//for data formate
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//for static path of public folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
const inventryRouter = require("./routes/api/inventry");

//Monodb connection
mongoose.connect("mongodb://localhost/diabudy", { useNewUrlParser: true })
.then(() => console.log("Connected to Mongo...."))
.catch((error) => console.log(error.message));

// mongoose.connect(
//   "mongodb+srv://shahhussainraja:hussain15@hussaindatabase.tgmg1.mongodb.net/?retryWrites=true&w=majority",{ useNewUrlParser: true })
//   .then(() => console.log("Connected to Mongo"))
//   .catch((error) => console.log("error " + error.message));

app.use("/user", inventryRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
