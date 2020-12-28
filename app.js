var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var codeRouter = require("./routes/codeUpload");
var cors = require("cors");
var swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/codeupload", codeRouter);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
