import { UserDomain } from "../../domain/entities/UserDomain";
import { AppDataSource } from "../DBConnection";
import { Snake } from "../snake/Snake";
import { snakeMapper } from "../snake/snakeMapper";
import { User } from "./User";

export class userMapper {
  static toDBEntity(user: UserDomain) {
    const entityUser: User = new User();
    if (user.id) {
      entityUser.id = user.id;
    }
    entityUser.firstName = user.firstName;
    entityUser.lastName = user.lastName;
    entityUser.maxScore = user.maxScore;
    if (user.snakes) {
      entityUser.snakesId = user.snakes.map((snake) => snake.id);
    }
    return entityUser;
  }
  static async toWorkUnit(user: User) {
    const workUser: UserDomain = new UserDomain();
    if (user.id) {
      workUser.id = user.id;
    }
    workUser.firstName = user.firstName;
    workUser.lastName = user.lastName;
    workUser.maxScore = user.maxScore;

    if (user.snakesId) {
      workUser.snakes = await Promise.all(
        user.snakesId.map(async (snakeId) => {
          const repository = AppDataSource.getRepository(Snake);
          const snake = await repository.findOneBy({ id: snakeId });
          if (snake) {
            return snakeMapper.toWorkUnit(snake);
          } else {
            throw new Error("Not Found");
          }
        })
      );
    }
    
    return workUser;
  }
}
