const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose.connect(
  "mongodb+srv://omnistack5:omnistack5@cluster0-zfcwj.mongodb.net/omnistack5",
  {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
  }
);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(require("./routes"));

server.listen("3333");
