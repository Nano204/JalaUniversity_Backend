import { Router } from "express";
import { BoardServiceInterface } from "../../appService/board/BoardServiceInterface";
import container from "../../dependencies/ioc_config";
import SERVICE_IDENTIFIER from "../../dependencies/identifiers";

const router = Router();

const boardService = container.get<BoardServiceInterface>(
  SERVICE_IDENTIFIER.BOARD_SERVICE
);

router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const findedBoard = await boardService.findBoard(Number(id));
    if (findedBoard) return res.status(200).json(findedBoard);
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.get("/find", async (req, res) => {
  try {
    const findedBoards = await boardService.findAllBoards();
    if (findedBoards.length) return res.status(200).json(findedBoards);
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { size } = req.body;
    const savedBoard = await boardService.createNew(Number(size));
    return res.status(201).json(savedBoard);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteBoard = await boardService.deleteBoard(Number(id));
    if (deleteBoard.affected) return res.status(201).json(deleteBoard);
    return res.sendStatus(404);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;
