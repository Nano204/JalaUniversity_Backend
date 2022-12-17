import { injectable } from "inversify";
import IBoard from "../../domain/entities/BoardDomain";
import { DBDeletion } from "../../domain/types/types";
import { BoardRepositoryInterface } from "../../domainRepository/BoardRepositoryInterface";
import { AppDataSource } from "../DBConnection"; // Revisar
import { Board } from "./Board";
import { boardMapper } from "./boardMapper";

@injectable()
export default class BoardRepository implements BoardRepositoryInterface {
  async save(board: IBoard): Promise<IBoard> {
    const repository = AppDataSource.getRepository(Board);
    const dbBoard = boardMapper.toDBEntity(board);
    const responseBoard = await repository.save(dbBoard);
    return boardMapper.toWorkUnit(responseBoard);
  }
  async findById(id: number): Promise<IBoard | null> {
    const repository = AppDataSource.getRepository(Board);
    const responseBoard = await repository.findOneBy({ id });
    return responseBoard && boardMapper.toWorkUnit(responseBoard);
  }

  async deleteById(id: number): Promise<DBDeletion> {
    const repository = AppDataSource.getRepository(Board);
    const deleted = await repository.delete({ id });
    return { affected: deleted.affected };
  }

  async findAll(): Promise<IBoard[]> {
    const repository = AppDataSource.getRepository(Board);
    const responseBoardArray = repository.find().then((boardsArray) => {
      return boardsArray.map((element) => {
        return boardMapper.toWorkUnit(element);
      });
    });
    return responseBoardArray;
  }
}
