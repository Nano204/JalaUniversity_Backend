// import { Router } from "express";
// const router = Router();

// router.post("/create", async (req, res) => {
//   try {
//     const { speed, size } = req.body;
//     const users = req.body.users && JSON.parse(req.body.users);
//     if (!users) {
//       throw new Error("At least one user is needed to play");
//     }
    
//     const savedGame = await new GameAPIService().createGame(speed, users, size);
//     return res.status(201).json(savedGame);
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// });

// export default router;
