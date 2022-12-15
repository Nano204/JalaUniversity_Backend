import { inject, injectable } from "inversify";
import { IUser } from "../../domain/entities/IUser";
import { DBDeletion } from "../../domain/types/types";
import { IUserRepository } from "../../domainRepository/user/IUserRepository";
import SERVICE_IDENTIFIER from "../../dependencies/constants/identifiers";

@injectable()
export default class UserService implements IUserRepository {
  private userRepository: IUserRepository;

  constructor(
    @inject(SERVICE_IDENTIFIER.USER_DB_REPOSITORY) userRepository: IUserRepository
  ) {
    this.userRepository = userRepository;
  }

  async add(user: IUser): Promise<IUser> {
    return await this.userRepository.add(user);
  }
  async update(user: IUser): Promise<IUser> {
    return await this.userRepository.update(user);
  }
  async find(id: number): Promise<IUser | null> {
    return await this.userRepository.find(id);
  }
  async delete(id: number): Promise<DBDeletion> {
    return await this.userRepository.delete(id);
  }
  async getAll(): Promise<IUser[]> {
    return await this.userRepository.getAll();
  }
}
