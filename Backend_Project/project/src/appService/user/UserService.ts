import { inject, injectable } from "inversify";
import { UserDomain } from "../../domain/entities/UserDomain";
import { DBDeletion } from "../../domain/types/types";
import { UserRepositoryInterface } from "../../domainRepository/UserRepositoryInterface";
import SERVICE_IDENTIFIER from "../../dependencies/identifiers";
import { UserServiceInterface } from "./UserServiceInterface";

@injectable()
export default class UserService implements UserServiceInterface {
  private userRepository: UserRepositoryInterface;

  constructor(
    @inject(SERVICE_IDENTIFIER.USER_DB_REPOSITORY) userRepository: UserRepositoryInterface
  ) {
    this.userRepository = userRepository;
  }

  async createNew(firstName: string, lastName: string): Promise<UserDomain> {
    const user = new UserDomain();
    user.firstName = firstName;
    user.lastName = lastName;
    user.maxScore = 0;
    return await this.userRepository.save(user);
  }
  async updateUser(user: UserDomain): Promise<UserDomain> {
    return await this.userRepository.save(user);
  }

  async findUser(id: number): Promise<UserDomain> {
    return await this.userRepository.findById(id);
  }

  async findMaxScoreRanking(limit: number): Promise<UserDomain[]> {
    return await this.userRepository.findMaxScoreRanking(limit);
  }

  async deleteUser(id: number): Promise<DBDeletion> {
    return await this.userRepository.deleteById(id);
  }

  async findAllUsers(): Promise<UserDomain[]> {
    return await this.userRepository.findAll();
  }
}
