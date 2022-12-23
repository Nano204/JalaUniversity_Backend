import { Router } from "express";
import container from "../../dependencies/ioc_config";
import SERVICE_IDENTIFIER from "../../dependencies/identifiers";
import { UserServiceInterface } from "../../appService/user/UserServiceInterface";

const router = Router();

const userService = container.get<UserServiceInterface>(SERVICE_IDENTIFIER.USER_SERVICE);

router.get("/ranking/:limit", async (req, res) => {
  try {
    const { limit } = req.params;
    const userRanking = await userService.findMaxScoreRanking(Number(limit));
    if (userRanking.length) return res.status(200).json(userRanking);
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findedUser = await userService.findUser(Number(id));
    if (findedUser) return res.status(200).json(findedUser);
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/find", async (req, res) => {
  try {
    const findedUsers = await userService.findAllUsers();
    if (findedUsers.length) return res.status(200).json(findedUsers);
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
      throw new Error("User needs a complete name");
    }

    const savedUser = await userService.createNew(firstName, lastName);
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteResponse = await userService.deleteUser(Number(id));
    if (deleteResponse.affected) return res.status(201).json(deleteResponse);
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;
