import { DeleteResult } from "typeorm";
import { Location } from "../domain/location";
import { AddLocationRepositoryRequest } from "./request/addLocation";
import { DeleteLocationRepositoryRequest } from "./request/deleteLocation";
import { FindLocationRepositoryRequest } from "./request/findLocation";

export interface ILocationRepository {
  addLocation(request: AddLocationRepositoryRequest): Promise<Location>;
  findLocation(request: FindLocationRepositoryRequest): Promise<Location | null>;
  deleteLocation(request: DeleteLocationRepositoryRequest): Promise<DeleteResult>;
  getAllLocations(): Promise<Location[]>;
}
