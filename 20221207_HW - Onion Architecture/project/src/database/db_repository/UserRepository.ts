import { AppDataSource } from "../DBConnection"; // Revisar
import { User } from "../db_entities/User"; //Revisar
import { injectable } from "inversify";
import { DBDeletion } from "../../domain/types/types";
import { AddUserRepositoryRequest } from "../../domainRepository/userRequest/addUser";
import { UpdateUserRepositoryRequest } from "../../domainRepository/userRequest/updateUser";
import { FindUserRepositoryRequest } from "../../domainRepository/userRequest/findUser";
import { DeleteUserRepositoryRequest } from "../../domainRepository/userRequest/deleteUser";
import { IUserRepository } from "../../domainRepository/IUserRepository";

@injectable()
export default class UserRepository implements IUserRepository {
  async addUser(request: AddUserRepositoryRequest): Promise<User> {
    const repository = AppDataSource.getRepository(User);
    return await repository.save(request);
  }

  async updateUser(request: UpdateUserRepositoryRequest): Promise<User> {
    const repository = AppDataSource.getRepository(User);
    return await repository.save(request);
  }

  async findUser(request: FindUserRepositoryRequest): Promise<User | null> {
    const repository = AppDataSource.getRepository(User);
    return await repository.findOneBy({ id: request.id });
  }

  async deleteUser(request: DeleteUserRepositoryRequest): Promise<DBDeletion> {
    const repository = AppDataSource.getRepository(User);
    const deleted = await repository.delete({ id: request.id });
    return { affected: deleted.affected };
  }

  async getAllUsers(): Promise<User[]> {
    const repository = AppDataSource.getRepository(User);
    return await repository.find();
  }
}
