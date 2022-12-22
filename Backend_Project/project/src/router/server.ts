import express from "express";
const server = express();

import gameBuilderRouter from "./controllers/gameBuilderRouter";
import gameRouter from "./controllers/gameRouter";
import userRouter from "./controllers/userRouter";
import boardRouter from "./controllers/boardRouter";
import snakeRouter from "./controllers/snakeRouter";
import snakeCommandsRouter from "./controllers/snakeCommandsRouter";
import foodRouter from "./controllers/foodRouter";
import testRouter from "./controllers/testRouter";

server.use(express.json());
server.use("/game/builder", gameBuilderRouter);
server.use("/game", gameRouter);
server.use("/user", userRouter);
server.use("/board", boardRouter);
server.use("/snake/command", snakeCommandsRouter);
server.use("/snake", snakeRouter);
server.use("/food", foodRouter);
server.use("/test", testRouter);

server.get("/", (req, res) => {
  res.send("The server is mounted");
});

export default server;
