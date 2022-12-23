import { Router } from "express";
import SnakeBehaviorService from "../../appService/snake/behavior/SnakeBehaviorService";
import { Direction } from "../../domain/types/types";

const router = Router();

router.post("/set_owner:snakeId/:ownerId", async (req, res) => {
  try {
    const { snakeId, ownerId } = req.params;
    const snakeBehaviorService = new SnakeBehaviorService();
    const snake = await snakeBehaviorService.setOwner(Number(snakeId), Number(ownerId));
    if (snake) return res.status(201).json(snake);
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/set_direction/:snakeId/direction", async (req, res) => {
  try {
    const { snakeId } = req.params;
    const { direction } = req.query;
    const snakeBehaviorService = new SnakeBehaviorService();
    const formatDirection: Direction = snakeBehaviorService.directionMapper(
      direction as "up" | "down" | "left" | "right"
    );
    const snake = await snakeBehaviorService.setDirection(
      Number(snakeId),
      formatDirection
    );
    if (snake) return res.status(201).json(snake);
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;
