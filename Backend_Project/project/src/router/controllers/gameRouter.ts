import { Router } from "express";
import { GameServiceInterface } from "../../appService/game/GameServiceInterface";
import SERVICE_IDENTIFIER from "../../dependencies/identifiers";
import container from "../../dependencies/ioc_config";
const router = Router();

const gameService = container.get<GameServiceInterface>(SERVICE_IDENTIFIER.GAME_SERVICE);

router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findedGame = await gameService.findGame(Number(id));
    if (findedGame) return res.status(200).json(findedGame);
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/find", async (req, res) => {
  try {
    const findedGame = await gameService.findAllGames();
    if (findedGame.length) return res.status(200).json(findedGame);
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/create", async (req, res) => {
  try {
    const savedGame = await gameService.createNew();
    return res.status(201).json(savedGame);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteResponse = await gameService.deleteGame(Number(id));
    if (deleteResponse.affected) return res.status(201).json(deleteResponse);
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;
