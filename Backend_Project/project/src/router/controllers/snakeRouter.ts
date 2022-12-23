import { Router } from "express";
import container from "../../dependencies/ioc_config";
import SERVICE_IDENTIFIER from "../../dependencies/identifiers";
import { SnakeServiceInterface } from "../../appService/snake/SnakeServiceInterface";

const router = Router();

const snakeService = container.get<SnakeServiceInterface>(
  SERVICE_IDENTIFIER.SNAKE_SERVICE
);

router.get("/find_owner/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findedOwnerId = await snakeService.findSnakeOwnerId(Number(id));
    if (findedOwnerId) return res.status(200).json(findedOwnerId);
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findedSnake = await snakeService.findSnake(Number(id));
    if (findedSnake) return res.status(200).json(findedSnake);
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/find", async (req, res) => {
  try {
    const findedSnake = await snakeService.findAllSnakes();
    if (findedSnake.length) return res.status(200).json(findedSnake);
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/create", async (req, res) => {
  try {
    const savedSnake = await snakeService.createNew();
    return res.status(201).json(savedSnake);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteResponse = await snakeService.deleteSnake(Number(id));
    if (deleteResponse.affected) return res.status(201).json(deleteResponse);
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;
