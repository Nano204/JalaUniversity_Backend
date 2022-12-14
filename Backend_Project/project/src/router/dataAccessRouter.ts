import { Router } from "express";
import { AppDataSource } from "../database/DBConnection";
const router = Router();

router.get("/init", async (req, res) => {
  try {
    await AppDataSource.initialize();
    return res.status(201).json("DataBase initialized");
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/drop", async (req, res) => {
  try {
    await AppDataSource.dropDatabase();
    return res.status(200).json("DataBase dropped");
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;
