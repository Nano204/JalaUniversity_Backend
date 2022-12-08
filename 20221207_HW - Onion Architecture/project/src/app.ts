import { AppDataSource } from "./db/DBConnection";
import LocationService from "./domainServices/LocationService";
import { abandago, anatomy, earth, worldender } from "./examples/planets";

class Test {
  async initillizeDB() {
    await AppDataSource.initialize();
    const locationService = new LocationService();
    console.log(await locationService.addLocation(earth));
    console.log(await locationService.addLocation(abandago));
    console.log(await locationService.addLocation(worldender));
    console.log(await locationService.addLocation(anatomy));

    console.log(await locationService.findLocation({ id: 1 }));
    console.log(await locationService.findLocation({ id: 2 }));

    console.log(await locationService.deleteLocation({ id: 4 }));
    await AppDataSource.dropDatabase();
  }
}

new Test().initillizeDB();
