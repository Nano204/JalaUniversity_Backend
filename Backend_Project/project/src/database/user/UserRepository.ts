import { AppDataSource } from "../DBConnection"; // Revisar
import { User } from "./User"; //Revisar
import { injectable } from "inversify";
import { DBDeletion } from "../../domain/types/types";
import { UserRepositoryInterface } from "../../domainRepository/UserRepositoryInterface";
import { UserDomain } from "../../domain/entities/UserDomain";
import { userMapper } from "./userMapper";

@injectable()
export default class UserRepository implements UserRepositoryInterface {
  async save(user: UserDomain): Promise<UserDomain> {
    const repository = AppDataSource.getRepository(User);
    const savedUser = await repository.save(userMapper.toDBEntity(user));
    return userMapper.toWorkUnit(savedUser);
  }

  async findById(id: number): Promise<UserDomain> {
    const repository = AppDataSource.getRepository(User);
    const findedUser = await repository.findOneBy({ id });
    if (!findedUser) {
      throw new Error("Not found");
    }
    return userMapper.toWorkUnit(findedUser);
  }

  async deleteById(id: number): Promise<DBDeletion> {
    const repository = AppDataSource.getRepository(User);
    const deleted = await repository.delete({ id });
    return { affected: deleted.affected };
  }

  async findAll(): Promise<UserDomain[]> {
    const repository = AppDataSource.getRepository(User);
    const responseUserArray = repository.find().then((boardsArray) => {
      return boardsArray.map((element) => {
        return userMapper.toWorkUnit(element);
      });
    });
    return responseUserArray;
  }

  async findMaxScoreRanking(limit: number): Promise<UserDomain[]> {
    const repository = AppDataSource.getRepository(User);
    const responseUserArray = repository
      .find({ order: { maxScore: "desc" }, skip: 0, take: limit })
      .then((boardsArray) => {
        return boardsArray.map((element) => {
          return userMapper.toWorkUnit(element);
        });
      });
    return responseUserArray;
  }
}
