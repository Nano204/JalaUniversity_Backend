import { inject, injectable } from "inversify";
import { DBDeletion } from "../domain/types/types";
import SERVICE_IDENTIFIER from "../dependencies/constants/identifiers";
import { IBoardRepository } from "../domainRepository/IBoardRepository";
import IBoard from "../domain/entities/IBoard";

@injectable()
export default class BoardService implements IBoardRepository {
  private boardRepository: IBoardRepository;

  constructor(
    @inject(SERVICE_IDENTIFIER.BOARD_DB_REPOSITORY) boardRepository: IBoardRepository
  ) {
    this.boardRepository = boardRepository;
  }

  async createBoard(sideLenght: number): Promise<IBoard> {
    return await this.boardRepository.createBoard(sideLenght);
  }
  async findBoard(id: number): Promise<IBoard | null> {
    return await this.boardRepository.findBoard(id);
  }
  async deleteBoard(id: number): Promise<DBDeletion> {
    return await this.boardRepository.deleteBoard(id);
  }
  async getAllBoards(): Promise<IBoard[]> {
    return await this.boardRepository.getAllBoards();
  }
}
