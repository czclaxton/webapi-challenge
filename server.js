const express = require("express");
const server = express();
const projectRouter = require("./data/projects/projectRouter");
const actionRouter = require("./data/actions/actionsRouter");

server.use(express.json());
server.use("/projects", projectRouter);
server.use("/projects/actions", actionRouter);

server.get("/", (req, res) => {
  res.send("<h1>server is up</h2>");
});

module.exports = server;
