import { AppDataSource } from "../DBConnection"; // Revisar
import { User } from "./User"; //Revisar
import { injectable } from "inversify";
import { DBDeletion } from "../../domain/types/types";
import { IUserRepository } from "../../domainRepository/user/IUserRepository";
import { IUser } from "../../domain/entities/IUser";

@injectable()
export default class UserRepository implements IUserRepository {
  async add(user: IUser): Promise<User> {
    const repository = AppDataSource.getRepository(User);
    return await repository.save(user);
  }

  async update(user: IUser): Promise<User> {
    const repository = AppDataSource.getRepository(User);
    return await repository.save(user);
  }

  async find(id: number): Promise<User | null> {
    const repository = AppDataSource.getRepository(User);
    return await repository.findOneBy({ id });
  }

  async delete(id: number): Promise<DBDeletion> {
    const repository = AppDataSource.getRepository(User);
    const deleted = await repository.delete({ id });
    return { affected: deleted.affected };
  }

  async getAll(): Promise<User[]> {
    const repository = AppDataSource.getRepository(User);
    return await repository.find();
  }
}
