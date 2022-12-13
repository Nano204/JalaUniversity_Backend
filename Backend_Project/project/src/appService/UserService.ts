import { inject, injectable } from "inversify";
import { IUser } from "../domain/entities/IUser";
import { DBDeletion } from "../domain/types/types";
import { IUserRepository } from "../domainRepository/IUserRepository";
import SERVICE_IDENTIFIER from "../dependencies/constants/identifiers";

@injectable()
export default class UserService implements IUserRepository {
  private userRepository: IUserRepository;

  constructor(
    @inject(SERVICE_IDENTIFIER.USER_DB_REPOSITORY) userRepository: IUserRepository
  ) {
    this.userRepository = userRepository;
  }

  async addUser(user: IUser): Promise<IUser> {
    return await this.userRepository.addUser(user);
  }
  async updateUser(user: IUser): Promise<IUser> {
    return await this.userRepository.updateUser(user);
  }
  async findUser(id: number): Promise<IUser | null> {
    return await this.userRepository.findUser(id);
  }
  async deleteUser(id: number): Promise<DBDeletion> {
    return await this.userRepository.deleteUser(id);
  }
  async getAllUsers(): Promise<IUser[]> {
    return await this.userRepository.getAllUsers();
  }
}
