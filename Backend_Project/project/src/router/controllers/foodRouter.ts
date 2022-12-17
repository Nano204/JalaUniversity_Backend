import { Router } from "express";
import container from "../../dependencies/ioc_config";
import SERVICE_IDENTIFIER from "../../dependencies/identifiers";
import { FoodServiceInterface } from "../../appService/food/FoodServiceInterface";

const router = Router();

const foodService = container.get<FoodServiceInterface>(SERVICE_IDENTIFIER.FOOD_SERVICE);

router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findedFood = await foodService.findFood(Number(id));
    if (findedFood) return res.status(200).json(findedFood);
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/find", async (req, res) => {
  try {
    const findedFoods = await foodService.findAllFoods();
    if (findedFoods.length) return res.status(200).json(findedFoods);
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { boundary } = req.body;
    const savedFood = await foodService.createNew(Number(boundary));
    return res.status(201).json(savedFood);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteResponse = await foodService.deleteFood(Number(id));
    if (deleteResponse.affected) return res.status(201).json(deleteResponse);
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;
