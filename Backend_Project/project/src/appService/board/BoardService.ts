import { inject, injectable } from "inversify";
import { DBDeletion } from "../../domain/types/types";
import SERVICE_IDENTIFIER from "../../dependencies/constants/identifiers";
import { IBoardRepository } from "../../domainRepository/board/IBoardRepository";
import IBoard from "../../domain/entities/IBoard";

@injectable()
export default class BoardService implements IBoardRepository {
  private boardRepository: IBoardRepository;

  constructor(
    @inject(SERVICE_IDENTIFIER.BOARD_DB_REPOSITORY) boardRepository: IBoardRepository
  ) {
    this.boardRepository = boardRepository;
  }
  async save(board: IBoard): Promise<IBoard> {
    return await this.boardRepository.save(board);
  }
  async find(id: number): Promise<IBoard | null> {
    return await this.boardRepository.find(id);
  }
  async delete(id: number): Promise<DBDeletion> {
    return await this.boardRepository.delete(id);
  }
  async getAll(): Promise<IBoard[]> {
    return await this.boardRepository.getAll();
  }
}
