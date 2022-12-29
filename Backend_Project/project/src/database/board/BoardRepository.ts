import { injectable } from "inversify";
import IBoard from "../../domain/entities/BoardDomain";
import { DBDeletion } from "../../domain/types/types";
import { BoardRepositoryInterface } from "../../domainRepository/BoardRepositoryInterface";
import { AppDataSource } from "../DBConnection";
import IdSetterRepository from "../idBuilder/IdSetterRepository";
import { Board } from "./Board";
import { boardMapper } from "./boardMapper";

@injectable()
export default class BoardRepository implements BoardRepositoryInterface {
  async save(board: IBoard): Promise<IBoard> {
    const repository = AppDataSource.getRepository(Board);
    const dbBoard = boardMapper.toDBEntity(board);
    if (!dbBoard.id) {
      dbBoard.id = await new IdSetterRepository().getNewId("Board");
    }
    const savedBoard = await repository.save(dbBoard);
    return boardMapper.toWorkUnit(savedBoard);
  }

  async findById(id: number): Promise<IBoard> {
    const repository = AppDataSource.getRepository(Board);
    const responseBoard = await repository.findOneBy({ id });
    if (!responseBoard) {
      throw new Error("Not found");
    }
    return boardMapper.toWorkUnit(responseBoard);
  }

  async deleteById(id: number): Promise<DBDeletion> {
    const repository = AppDataSource.getRepository(Board);
    const deleted = await repository.delete({ id });
    return { affected: deleted.affected };
  }

  async findAll(): Promise<IBoard[]> {
    const repository = AppDataSource.getRepository(Board);
    const responsePromiseArray = await repository.find();
    const responseBoardArray = await Promise.all(
      responsePromiseArray.map((element) => {
        return boardMapper.toWorkUnit(element);
      })
    );
    return responseBoardArray;
  }
}
