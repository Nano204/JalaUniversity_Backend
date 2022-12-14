import express from "express";
const server = express();

import gameRouter from "./gameRouter";
import dbRouter from "./dataAccessRouter";
server.use("/game", gameRouter);
server.use("/db", dbRouter);

server.get("/", (req, res) => {
  res.send("The server is mounted");
});

export default server;
