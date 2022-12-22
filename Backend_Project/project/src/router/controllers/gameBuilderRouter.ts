import { Router } from "express";
import GameBuilder from "../../appService/game/builder/GameBuilderService";
const router = Router();

router.post("/set_users/:gameId", async (req, res) => {
  try {
    const { gameId } = req.params;
    const usersId = JSON.parse(req.body.users);
    const gameBuilder = new GameBuilder();
    const savedGame = await gameBuilder.setUsers(Number(gameId), usersId);
    return res.status(201).json(savedGame);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/set_size/:gameId/:size", async (req, res) => {
  try {
    const { gameId, size } = req.params;
    const gameBuilder = new GameBuilder();
    const savedGame = await gameBuilder.setSize(Number(gameId), Number(size));
    return res.status(201).json(savedGame);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/set_speed/:gameId/:speed", async (req, res) => {
  try {
    const { gameId, speed } = req.params;
    const gameBuilder = new GameBuilder();
    const savedGame = await gameBuilder.setSpeed(Number(gameId), Number(speed));
    return res.status(201).json(savedGame);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/build/:gameId", async (req, res) => {
  try {
    const { gameId } = req.params;
    const gameBuilder = new GameBuilder();
    const savedGame = await gameBuilder.buildGame(Number(gameId));
    return res.status(201).json(savedGame);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;
