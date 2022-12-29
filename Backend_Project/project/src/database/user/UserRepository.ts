import { AppDataSource } from "../DBConnection";
import { User } from "./User";
import { injectable } from "inversify";
import { DBDeletion } from "../../domain/types/types";
import { UserRepositoryInterface } from "../../domainRepository/UserRepositoryInterface";
import { UserDomain } from "../../domain/entities/UserDomain";
import { userMapper } from "./userMapper";
import IdSetterRepository from "../idBuilder/IdSetterRepository";

@injectable()
export default class UserRepository implements UserRepositoryInterface {
  async save(user: UserDomain): Promise<UserDomain> {
    const repository = AppDataSource.getRepository(User);
    const dbUser = userMapper.toDBEntity(user);
    if (!dbUser.id) {
      dbUser.id = await new IdSetterRepository().getNewId("User");
      const savedUser = await repository.save(dbUser);
      return userMapper.toWorkUnit(savedUser);
    }
    const findedUser = await repository.findOneBy({ id: dbUser.id });
    if (findedUser) {
      const savedUser = await repository.save(findedUser);
      return userMapper.toWorkUnit(savedUser);
    } else {
      throw new Error("Not found");
    }
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
    const responsePromiseArray = await repository.find();
    const responseUserArray = await Promise.all(
      responsePromiseArray.map((element) => {
        return userMapper.toWorkUnit(element);
      })
    );
    return responseUserArray;
  }

  async findMaxScoreRanking(limit: number): Promise<UserDomain[]> {
    const repository = AppDataSource.getRepository(User);
    const responsePromiseArray = await repository.find({
      order: { maxScore: "desc" },
      skip: 0,
      take: limit,
    });
    const responseUserArray = await Promise.all(
      responsePromiseArray.map((element) => {
        return userMapper.toWorkUnit(element);
      })
    );
    return responseUserArray;
  }
}
