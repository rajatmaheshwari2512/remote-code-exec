var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");
var http = require("http");
var socketio = require("socket.io");

var codeRouter = require("./routes/codeUpload");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./socket/users");

var app = express();

const server = require("http").createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
  },
  pingTimeout: 1000,
  pingInterval: 3000,
});

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

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);
    socket.emit("welcomeMessage", {
      text: `Welcome to the Room, ${user.name}!`,
    });
    socket.broadcast
      .to(user.room)
      .emit("welcomeMessage", { text: `${user.name} has joined.` });
    console.log(`${user.name}:${room}`);
    callback();
  });

  socket.on("sendCode", (message, callback) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit("code", { text: message });
    }
    callback();
  });
  socket.on("sendInput", (input, callback) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit("input", { text: input });
    }
    callback();
  });
  socket.on("sendOutput", (output, callback) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit("output", { text: output });
    }
    callback();
  });
  socket.on("sendFont", (font, callback) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit("font", { text: font });
    }
    callback();
  });
  socket.on("sendMode", (mode, callback) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit("mode", { text: mode });
    }
    callback();
  });
  socket.on("sendLang", (lang, callback) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit("lang", { text: lang });
    }
    callback();
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    console.log(user);
    if (user) {
      io.to(user.room).emit("disMess", {
        text: `${user.name} has left the room`,
      });
    }
  });
});

module.exports = { app: app, server: server };
