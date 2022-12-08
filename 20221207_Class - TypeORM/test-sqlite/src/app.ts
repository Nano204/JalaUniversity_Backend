import PhotoDataAccess from "./data-access";
import { AppDataSource } from "./data-source";
import { Photo } from "./entities/photo";

class Test {
  async initillizeDB() {
    await AppDataSource.initialize();
    const photo = new Photo();
    photo.description = "test";
    photo.fileName = "20221207.jpg";
    photo.name = "12072022";

    const dataAccess = new PhotoDataAccess();
    dataAccess.create(photo);

    const photoLoaded = await dataAccess.read(1);
    console.log(photoLoaded);

    photoLoaded.description = "Uploaded";
    dataAccess.update(photoLoaded);
    console.log(photoLoaded);

    console.log(await dataAccess.delete(3));
  }
}

new Test().initillizeDB();
