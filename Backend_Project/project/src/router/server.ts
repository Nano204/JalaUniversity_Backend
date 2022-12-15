import express from "express";
const server = express();

import gameRouter from "./controllers/gameRouter";

server.use(express.json());
server.use("/game", gameRouter);

server.get("/", (req, res) => {
  res.send("The server is mounted");
});

export default server;
