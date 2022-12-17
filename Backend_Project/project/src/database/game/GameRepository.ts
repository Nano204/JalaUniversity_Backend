// import { injectable } from "inversify";
// import IGame from "../../domain/entities/GameDomain";
// import { DBDeletion } from "../../domain/types/types";
// import { GameRepositoryInterface } from "../../domainRepositories/GameRepositoryInterface";
// import { AppDataSource } from "../DBConnection";
// import { User } from "../user/User";
// import { Game } from "./Game";
// import { gameMapper } from "./gameMapper";
// import { Board } from "../board/Board";
// import { boardMapper } from "../board/boardMapper";

// @injectable()
// export class GameRepository implements GameRepositoryInterface {
//   async build(game: IGame, usersIdArray: number[], size: number): Promise<IGame> {
//     //Set usefull repositories
//     const gameRepository = AppDataSource.getRepository(Game);
//     const userRepository = AppDataSource.getRepository(User);
//     const boardRepository = AppDataSource.getRepository(Board);
//     // const boardRepository = new BoardRepository();
//     //Prepare game as data base entity
//     const dataBaseGame = gameMapper.toDBEntity(game);
//     const createdGame = gameRepository.create(dataBaseGame);
//     //Search for users entities
//     const usersArray = await Promise.all(
//       usersIdArray.map((id) =>
//         userRepository.findOne({
//           where: { id },
//         })
//       )
//     );
//     //Set users on the game
//     if (usersArray.includes(null)) throw new Error("Usuario no encontrado");
//     createdGame.users = usersArray as User[];
//     //Create board
//     const createdBoard = new BoardUnitOfWorkService().create(size);
//     const createdBoardToDBEntity = boardMapper.toDBEntity(createdBoard);
//     const savedBoard = await boardRepository.save(createdBoardToDBEntity);
//     createdGame.board = savedBoard;
//     //Create snakes
//     console.log(createdGame);
//     const responseGame = await gameRepository.save(createdGame);
//     return gameMapper.toWorkUnit(responseGame);
//   }

//   async find(id: number): Promise<IGame | null> {
//     const repository = AppDataSource.getRepository(Game);
//     const responseGame = await repository.findOneBy({ id });
//     return responseGame && gameMapper.toWorkUnit(responseGame);
//   }

//   async delete(id: number): Promise<DBDeletion> {
//     const repository = AppDataSource.getRepository(Game);
//     const deleted = await repository.delete({ id });
//     return { affected: deleted.affected };
//   }

//   async getAll(): Promise<IGame[]> {
//     const repository = AppDataSource.getRepository(Game);
//     const responseGameArray = repository.find().then((boardsArray) => {
//       return boardsArray.map((element) => {
//         return gameMapper.toWorkUnit(element);
//       });
//     });
//     return responseGameArray;
//   }
// }
