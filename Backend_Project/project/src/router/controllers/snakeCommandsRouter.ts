import { Router } from "express";
import SnakeBehaviorService from "../../appService/snake/behavior/SnakeBehaviorService";

const router = Router();

router.post("/set_owner/:snakeId/:ownerId", async (req, res) => {
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

router.post("/set_direction/:snakeId/:direction", async (req, res) => {
  try {
    const { snakeId, direction } = req.params;
    const snakeBehaviorService = new SnakeBehaviorService();
    const snake = await snakeBehaviorService.setDirection(
      Number(snakeId),
      direction as "up" | "down" | "left" | "right"
    );
    if (snake) return res.status(201).json(snake);
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ error });
  }
});



export default router;
