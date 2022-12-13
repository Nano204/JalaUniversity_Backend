import { AppDataSource } from "../DBConnection"; // Revisar
import { injectable } from "inversify";
import { DBDeletion } from "../../domain/types/types";
import { IBoardRepository } from "../../domainRepository/IBoardRepository";
import { Board } from "../db_entities/Board";
import IBoard from "../../domain/entities/IBoard";

@injectable()
export default class BoardRepository implements IBoardRepository {
  async createBoard(sideLenght: number): Promise<Board> {
    const repository = AppDataSource.getRepository(Board);
    const board = new IBoard(sideLenght);
    return await repository.save(board);
  }
  async findBoard(id: number): Promise<Board | null> {
    const repository = AppDataSource.getRepository(Board);
    return await repository.findOneBy({ id });
  }
  async deleteBoard(id: number): Promise<DBDeletion> {
    const repository = AppDataSource.getRepository(Board);
    const deleted = await repository.delete({ id });
    return { affected: deleted.affected };
  }
  async getAllBoards(): Promise<Board[]> {
    const repository = AppDataSource.getRepository(Board);
    return await repository.find();
  }
}
