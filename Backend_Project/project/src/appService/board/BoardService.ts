import { inject, injectable } from "inversify";
import { DBDeletion } from "../../domain/types/types";
import SERVICE_IDENTIFIER from "../../dependencies/identifiers";
import BoardDomain from "../../domain/entities/BoardDomain";
import { BoardRepositoryInterface } from "../../domainRepository/BoardRepositoryInterface";
import { BoardServiceInterface } from "./BoardServiceInterface";

@injectable()
export default class BoardService implements BoardServiceInterface {
  private boardRepository: BoardRepositoryInterface;

  constructor(
    @inject(SERVICE_IDENTIFIER.BOARD_DB_REPOSITORY)
      boardRepository: BoardRepositoryInterface
  ) {
    this.boardRepository = boardRepository;
  }
  async createNew(size: number): Promise<BoardDomain> {
    const board = new BoardDomain();
    board.coordinates = new Array(size).fill(new Array(size).fill("0"));
    return await this.boardRepository.save(board);
  }
  async updateBoard(board: BoardDomain): Promise<BoardDomain> {
    return await this.boardRepository.save(board);
  }
  async findBoard(id: number): Promise<BoardDomain> {
    return await this.boardRepository.findById(id);
  }
  async deleteBoard(id: number): Promise<DBDeletion> {
    return await this.boardRepository.deleteById(id);
  }
  async findAllBoards(): Promise<BoardDomain[]> {
    return await this.boardRepository.findAll();
  }
}