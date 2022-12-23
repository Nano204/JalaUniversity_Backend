import { UserServiceInterface } from "../appService/user/UserServiceInterface";
import { AppDataSource } from "../database/DBConnection";
import SERVICE_IDENTIFIER from "../dependencies/identifiers";
import container from "../dependencies/ioc_config";
import { UserDomain } from "../domain/entities/UserDomain";

describe("User service testing", () => {
  const userService = container.get<UserServiceInterface>(
    SERVICE_IDENTIFIER.USER_SERVICE
  );

  let user3 = new UserDomain();
  let user4 = new UserDomain();
  let user5 = new UserDomain();
  let user6 = new UserDomain();

  beforeAll(async () => {
    user3.firstName = "Player";
    user3.lastName = "03";
    user4.firstName = "Player";
    user4.lastName = "04";
    user5.firstName = "Player";
    user5.lastName = "05";
    user6.firstName = "Player";
    user6.lastName = "06";

    await AppDataSource.initialize();
    user3 = await userService.createNew(user3.firstName, user3.lastName);
    user4 = await userService.createNew(user4.firstName, user4.lastName);
    user5 = await userService.createNew(user5.firstName, user5.lastName);
    user6 = await userService.createNew(user6.firstName, user6.lastName);
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });

  it("Should return an UserDomain when create a new user", () => {
    const user1 = new UserDomain();
    user1.firstName = "Player";
    user1.lastName = "01";
    userService.createNew(user1.firstName, user1.lastName).then((response) => {
      expect(response instanceof UserDomain).toBeTruthy();
    });
  });

  it("Should return an Error if creating a user with same names", () => {
    const user2 = new UserDomain();
    user2.firstName = "Player";
    user2.lastName = "02";

    const promises = Promise.all([
      userService.createNew(user2.firstName, user2.lastName),
      userService.createNew(user2.firstName, user2.lastName),
    ]);
    expect(promises).rejects.toThrowError();
  });

  it("Should return an UserDomain when finding a user", () => {
    userService.findUser(3).then((response) => {
      expect(response instanceof UserDomain).toBeTruthy();
    });
  });

  it("Should update an User in DB and return a UserDomain", () => {
    user3.maxScore = 9;
    userService.updateUser(user3).then((response) => {
      expect(response.maxScore).toBe(9);
      expect(response instanceof UserDomain).toBeTruthy();
    });
  });

  it("Should throw error if not finding a user", () => {
    expect(userService.findUser(99)).rejects.toThrowError();
  });

  it("Should return an Ranking in order of max scores", () => {
    user3.maxScore = 9;
    user4.maxScore = 11;
    user5.maxScore = 17;
    Promise.all([
      userService.updateUser(user3),
      userService.updateUser(user4),
      userService.updateUser(user5),
    ]).then(() => {
      userService.findMaxScoreRanking(3).then((response) => {
        expect(response[0].maxScore).toBe(17);
        expect(response[0].lastName).toBe("05");
        expect(response[1].maxScore).toBe(11);
        expect(response[1].lastName).toBe("04");
        expect(response[2].maxScore).toBe(9);
        expect(response[2].lastName).toBe("03");
      });
    });
  });

  it("Should return Delete object type when delete an User", () => {
    userService.deleteUser(4).then((response) => {
      expect(response.affected).toBe(1);
    });
  });

  it("Should return and Array when find all Users", () => {
    userService.findAllUsers().then((response) => {
      expect(Array.isArray(response)).toBeTruthy();
    });
  });

});
