import { injectable } from "inversify";
import IBoard from "../../domain/entities/IBoard";
import { DBDeletion } from "../../domain/types/types";
import { IBoardRepository } from "../../domainRepository/IBoardRepository";
import { AppDataSource } from "../DBConnection"; // Revisar
import { Board } from "../db_entities/Board";
import { boardMapper } from "../db_mappers/boardMapper";

@injectable()
export default class BoardRepository implements IBoardRepository {
  async saveBoard(board: IBoard): Promise<IBoard> {
    const repository = AppDataSource.getRepository(Board);
    const dbBoard = boardMapper.toDBEntity(board);
    const responseBoard = await repository.save(dbBoard);
    return boardMapper.toWorkUnit(responseBoard);
  }
  async findBoard(id: number): Promise<IBoard | null> {
    const repository = AppDataSource.getRepository(Board);
    const responseBoard = await repository.findOneBy({ id });
    return responseBoard && boardMapper.toWorkUnit(responseBoard);
  }

  async deleteBoard(id: number): Promise<DBDeletion> {
    const repository = AppDataSource.getRepository(Board);
    const deleted = await repository.delete({ id });
    return { affected: deleted.affected };
  }

  async getAllBoards(): Promise<IBoard[]> {
    const repository = AppDataSource.getRepository(Board);
    const responseBoardArray = repository.find().then((boardsArray) => {
      return boardsArray.map((element) => {
        return boardMapper.toWorkUnit(element);
      });
    });
    return responseBoardArray;
  }
}
