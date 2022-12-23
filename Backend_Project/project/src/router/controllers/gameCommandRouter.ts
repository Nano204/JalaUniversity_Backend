import { Router } from "express";
import GameBehaviorService from "../../appService/game/behavior/GameBehaviorService";
import { GameServiceInterface } from "../../appService/game/GameServiceInterface";
import SERVICE_IDENTIFIER from "../../dependencies/identifiers";
import container from "../../dependencies/ioc_config";

const router = Router();

const gameService = container.get<GameServiceInterface>(SERVICE_IDENTIFIER.GAME_SERVICE);

const gameBehaviorServices: { [x: string]: GameBehaviorService } = {};

async function assingGameBehavior(gameId: string) {
  const game = await gameService.findGame(Number(gameId));
  if (gameBehaviorServices[gameId]) {
    gameBehaviorServices[gameId].setGame(game);
    return gameBehaviorServices[gameId];
  }
  const gameBehavior = new GameBehaviorService(game);
  gameBehaviorServices[gameId] = gameBehavior;
  return gameBehavior;
}

router.get("/visualize/:gameId", async (req, res) => {
  try {
    const { gameId } = req.params;
    const gameBehavior = await assingGameBehavior(gameId);
    const game = await gameBehavior.visualizeBoard();
    return res.status(200).json(game);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/init/:gameId", async (req, res) => {
  try {
    const { gameId } = req.params;
    const gameBehavior = await assingGameBehavior(gameId);
    const game = await gameBehavior.initialize();
    await gameBehavior.visualizeBoard();
    return res.status(202).json(game);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/stop/:gameId", async (req, res) => {
  try {
    const { gameId } = req.params;
    const gameBehavior = await assingGameBehavior(gameId);
    const game = await gameBehavior.stop();
    await gameBehavior.visualizeBoard();
    return res.status(202).json(game);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/reset/:gameId", async (req, res) => {
  try {
    const { gameId } = req.params;
    const gameBehavior = await assingGameBehavior(gameId);
    const game = await gameBehavior.reset();
    await gameBehavior.visualizeBoard();
    return res.status(202).json(game);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;
