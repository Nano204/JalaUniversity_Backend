import { AppDataSource } from "../DBConnection"; // Revisar
import { User } from "../db_entities/User"; //Revisar
import { injectable } from "inversify";
import { DBDeletion } from "../../domain/types/types";
import { IUserRepository } from "../../domainRepository/IUserRepository";
import { IUser } from "../../domain/entities/IUser";

@injectable()
export default class UserRepository implements IUserRepository {
  async addUser(user: IUser): Promise<User> {
    const repository = AppDataSource.getRepository(User);
    return await repository.save(user);
  }

  async updateUser(user: IUser): Promise<User> {
    const repository = AppDataSource.getRepository(User);
    return await repository.save(user);
  }

  async findUser(id: number): Promise<User | null> {
    const repository = AppDataSource.getRepository(User);
    return await repository.findOneBy({ id });
  }

  async deleteUser(id: number): Promise<DBDeletion> {
    const repository = AppDataSource.getRepository(User);
    const deleted = await repository.delete({ id });
    return { affected: deleted.affected };
  }

  async getAllUsers(): Promise<User[]> {
    const repository = AppDataSource.getRepository(User);
    return await repository.find();
  }
}
