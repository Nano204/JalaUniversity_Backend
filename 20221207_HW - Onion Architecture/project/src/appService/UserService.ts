import { inject, injectable } from "inversify";
import { IUser } from "../domain/entities/IUser";
import { DBDeletion } from "../domain/types/types";
import { IUserRepository } from "../domainRepository/IUserRepository";
import { AddUserRepositoryRequest } from "../domainRepository/userRequest/addUser";
import { DeleteUserRepositoryRequest } from "../domainRepository/userRequest/deleteUser";
import { FindUserRepositoryRequest } from "../domainRepository/userRequest/findUser";
import { UpdateUserRepositoryRequest } from "../domainRepository/userRequest/updateUser";
import SERVICE_IDENTIFIER from "../dependencies/constants/identifiers";

@injectable()
export default class UserService implements IUserRepository {
  private userRepository: IUserRepository;

  constructor(
    @inject(SERVICE_IDENTIFIER.USER_DB_REPOSITORY) userRepository: IUserRepository
  ) {
    this.userRepository = userRepository;
  }

  async addUser(request: AddUserRepositoryRequest): Promise<IUser> {
    return await this.userRepository.addUser(request);
  }
  async updateUser(request: UpdateUserRepositoryRequest): Promise<IUser> {
    return await this.userRepository.updateUser(request);
  }
  async findUser(request: FindUserRepositoryRequest): Promise<IUser | null> {
    return await this.userRepository.findUser(request);
  }
  async deleteUser(request: DeleteUserRepositoryRequest): Promise<DBDeletion> {
    return await this.userRepository.deleteUser(request);
  }
  async getAllUsers(): Promise<IUser[]> {
    return await this.userRepository.getAllUsers();
  }
}
