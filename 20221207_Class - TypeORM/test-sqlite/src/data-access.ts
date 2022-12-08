import { AppDataSource } from "./data-source";
import { Photo } from "./entities/photo";

export default class PhotoDataAccess {
  async create(photo: Photo) {
    const repository = AppDataSource.getRepository(Photo);
    await repository.save(photo);
  }

  async read(id: number) {
    const repository = AppDataSource.getRepository(Photo);
    return await repository.findOneBy({ id: id });
  }

  async update(photo: Photo) {
    const repository = AppDataSource.getRepository(Photo);
    await repository.save(photo);
  }

  async delete(id: number) {
    const repository = AppDataSource.getRepository(Photo);
    return await repository.delete({ id: id });
  }
}
