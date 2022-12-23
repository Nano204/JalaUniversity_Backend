import { Board } from "../database/board/Board";
import { boardMapper } from "../database/board/boardMapper";
import { Food } from "../database/food/Food";
import { foodMapper } from "../database/food/foodMapper";
import { Game } from "../database/game/Game";
import { gameMapper } from "../database/game/gameMapper";
import { Snake } from "../database/snake/Snake";
import { snakeMapper } from "../database/snake/snakeMapper";
import { User } from "../database/user/User";
import { userMapper } from "../database/user/userMapper";
import BoardDomain from "../domain/entities/BoardDomain";
import { FoodDomain } from "../domain/entities/FoodDomain";
import GameDomain from "../domain/entities/GameDomain";
import { SnakeDomain } from "../domain/entities/SnakeDomain";
import { UserDomain } from "../domain/entities/UserDomain";
import { Direction } from "../domain/types/types";

describe("Mappers testing", () => {
  it("Should return a Board database entity when BoardDomain given and vice versa", async () => {
    const testBoard: BoardDomain = new BoardDomain();
    testBoard.id = 99;
    testBoard.coordinates = [[]];
    testBoard.game = new GameDomain();

    const boardDB = boardMapper.toDBEntity(testBoard);
    expect(boardDB instanceof Board).toBeTruthy();
    const boardWorkUnit = boardMapper.toWorkUnit(boardDB);
    expect(boardWorkUnit instanceof BoardDomain).toBeTruthy();
  });

  it("Should return a Food database entity when FoodDomain given and vice versa", async () => {
    const testFood: FoodDomain = new FoodDomain();
    testFood.game = new GameDomain();
    testFood.id = 99;
    testFood.position = { x: 1, y: 1 };

    const foodDB = foodMapper.toDBEntity(testFood);
    expect(foodDB instanceof Food).toBeTruthy();
    const foodWorkUnit = foodMapper.toWorkUnit(foodDB);
    expect(foodWorkUnit instanceof FoodDomain).toBeTruthy();
  });

  it("Should return a Snake database entity when SnakeDomain given and vice versa", async () => {
    const testSnake: SnakeDomain = new SnakeDomain();
    testSnake.direction = Direction.up;
    testSnake.game = new GameDomain();
    testSnake.head = { x: 1, y: 1 };
    testSnake.id = 99;
    testSnake.length = 1;
    testSnake.nextNodeSpace = { x: 1, y: 1 };
    testSnake.nodes = [];
    testSnake.status = "Alive";
    testSnake.user = new UserDomain();

    const snakeDB = snakeMapper.toDBEntity(testSnake);
    expect(snakeDB instanceof Snake).toBeTruthy();
    const snakeWorkUnit = snakeMapper.toWorkUnit(snakeDB);
    expect(snakeWorkUnit instanceof SnakeDomain).toBeTruthy();
  });

  it("Should return a User database entity when UserDomain given and vice versa", async () => {
    const testUser: UserDomain = new UserDomain();
    testUser.firstName = "Player";
    testUser.lastName = "Tester";
    testUser.id = 99;
    testUser.games = [new GameDomain()];
    testUser.maxScore = 100;
    testUser.snakes = [new SnakeDomain()];

    const userDB = userMapper.toDBEntity(testUser);
    expect(userDB instanceof User).toBeTruthy();
    const userWorkUnit = userMapper.toWorkUnit(userDB);
    expect(userWorkUnit instanceof UserDomain).toBeTruthy();
  });

  it("Should return a Game database entity when GameDomain given and vice versa", async () => {
    const testGame: GameDomain = new GameDomain();
    testGame.board = new BoardDomain();
    testGame.food = new FoodDomain();
    testGame.id = 99;
    testGame.interval = 1000;
    testGame.size = 10;
    testGame.snakes = [new SnakeDomain()];
    testGame.state = "Ready";
    testGame.users = [new UserDomain()];

    const gameDB = gameMapper.toDBEntity(testGame);
    expect(gameDB instanceof Game).toBeTruthy();

    const gameWorkUnit = gameMapper.toWorkUnit(gameDB);
    expect(gameWorkUnit instanceof GameDomain).toBeTruthy();
  });
});
