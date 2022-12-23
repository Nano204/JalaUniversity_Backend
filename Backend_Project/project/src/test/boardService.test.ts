import { BoardServiceInterface } from "../appService/board/BoardServiceInterface";
import { AppDataSource } from "../database/DBConnection";
import SERVICE_IDENTIFIER from "../dependencies/identifiers";
import container from "../dependencies/ioc_config";
import BoardDomain from "../domain/entities/BoardDomain";

describe("Board service testing", () => {
  const boardService = container.get<BoardServiceInterface>(
    SERVICE_IDENTIFIER.BOARD_SERVICE
  );

  let board1: BoardDomain | Promise<BoardDomain>;

  beforeAll(async () => {
    await AppDataSource.initialize();
    boardService.createNew(10);
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });

  it("Should return an BoardDomain when create a new board", async () => {
    boardService.createNew(10).then((reponse) => {
      expect(reponse instanceof BoardDomain).toBeTruthy();
    });
  });

  it("Should update an Board in DB and return a BoardDomain", async () => {
    board1 = await boardService.createNew(10);
    board1.coordinates[2][1] = "H";
    boardService.updateBoard(board1).then((response) => {
      expect(response.coordinates[2][1]).toBe("H");
      expect(response instanceof BoardDomain).toBeTruthy();
    });
  });

  it("Should return an BoardDomain when finding a board", async () => {
    boardService.findBoard(1).then((response) => {
      expect(response instanceof BoardDomain).toBeTruthy();
    });
  });

  it("Should throw error if not finding a board", () => {
    expect(boardService.findBoard(4)).rejects.toThrowError();
  });

  it("Should return Delete object type when delete a board", async () => {
    boardService.deleteBoard(2).then((response) => {
      expect(response.affected).toBe(1);
    });
  });

  it("Should return and Array when find all Boards", async () => {
    boardService.findAllBoards().then((response) => {
      expect(Array.isArray(response)).toBeTruthy();
    });
  });
});
