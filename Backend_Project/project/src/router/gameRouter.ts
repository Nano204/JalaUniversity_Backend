import { Router } from "express";
import GameUnitOfWorkService from "../appService/GameUnitOfWorkService";
import container from "../dependencies/config/ioc_config";
import SERVICE_IDENTIFIER from "../dependencies/constants/identifiers";
import { IGameRepository } from "../domainRepository/IGameRepository";
const router = Router();

router.post("/create", async (req, res) => {
  try {
    console.log(req.body);
    const { size, users } = req.body;
    if (!users) throw new Error("At least one user is needed to play");
    const gameContainer = container.get<IGameRepository>(SERVICE_IDENTIFIER.GAME_SERVICE);
    const createdGame = await new GameUnitOfWorkService().createGame(size, users);
    const savedGame = await gameContainer.save(createdGame);
    return res.status(201).json(savedGame);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;
