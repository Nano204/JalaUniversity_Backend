import { Router } from "express";
import GameBehaviorService from "../../appService/game/behavior/GameBehaviorService";
import { GameServiceInterface } from "../../appService/game/GameServiceInterface";
import SERVICE_IDENTIFIER from "../../dependencies/identifiers";
import container from "../../dependencies/ioc_config";

const router = Router();

const gameService = container.get<GameServiceInterface>(SERVICE_IDENTIFIER.GAME_SERVICE);

router.post("/game/fill_board/:gameId", async (req, res) => {
  try {
    console.log();
    const { gameId } = req.params;
    const game = await gameService.findGame(Number(gameId));
    const gameBehavior = new GameBehaviorService(game);
    const board = await gameBehavior.visualizeBoard();
    const position = gameBehavior.newAvailablePosition();
    console.log(position);
    return res.status(201).json(board);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/game/move/:gameId", async (req, res) => {
  try {
    console.log();
    const { gameId } = req.params;
    let game = await gameService.findGame(Number(gameId));
    const gameBehavior = new GameBehaviorService(game);
    game = await gameBehavior.moveFrame();
    // const food = await gameBehavior.changeFoodPosition();
    await gameBehavior.visualizeBoard();
    return res.status(201).json(game);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// router.post("/game/initialize/:gameId", async (req, res) => {
//   try {
//     console.log();
//     const { gameId } = req.params;
//     const gameBehavior = new GameBehaviorService();
//     await gameBehavior.clearBoard(Number(gameId));
//     // await gameBehavior.initialize(Number(gameId));
//     const game = await gameBehavior.visualizeBoard(Number(gameId));
//     if (game) return res.status(201).json(game);
//     return res.sendStatus(404);
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// });

export default router;
