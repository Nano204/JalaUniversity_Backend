import { DeleteResult } from "typeorm";
import { AppDataSource } from "../db/DBConnection";
import { Location } from "../domain/location";
import { ILocationRepository } from "./ILocationRepository";
import { AddLocationRepositoryRequest } from "./request/addLocation";
import { DeleteLocationRepositoryRequest } from "./request/deleteLocation";
import { FindLocationRepositoryRequest } from "./request/findLocation";

export default class LocationService implements ILocationRepository {
  async addLocation(request: AddLocationRepositoryRequest): Promise<Location> {
    const repository = AppDataSource.getRepository(Location);
    return await repository.save(request);
  }
  async findLocation(request: FindLocationRepositoryRequest): Promise<Location | null> {
    const repository = AppDataSource.getRepository(Location);
    return await repository.findOneBy({ id: request.id });
  }
  async deleteLocation(request: DeleteLocationRepositoryRequest): Promise<DeleteResult> {
    const repository = AppDataSource.getRepository(Location);
    return await repository.delete({ id: request.id });
  }
  async getAllLocations(): Promise<Location[]> {
    const repository = AppDataSource.getRepository(Location);
    return await repository.find();
  }
}
