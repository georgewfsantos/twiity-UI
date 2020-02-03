const express = require("express");

const TweetController = require("./app/controllers/TweetController");
const LikeController = require("./app/controllers/LikeController");

const routes = express.Router();

routes.get("/tweets", TweetController.index);
routes.post("/tweets", TweetController.store);

routes.post("/likes/:id", LikeController.store);
module.exports = routes;
