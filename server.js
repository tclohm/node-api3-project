const express = require('express');
const Logger = require("./middleware/logger.js");

const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter.js");

const server = express();

server.use(express.json());
server.use(Logger.logger);

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// module.exports -- exporting a default value
module.exports = server;
