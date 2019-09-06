const express = require("express");
const server = express();
const projectRouter = require("./data/projects/projectRouter");

server.use(express.json());
server.use("/projects", projectRouter);

server.get("/", (req, res) => {
  res.send("<h1>server is up</h2>");
});

module.exports = server;
