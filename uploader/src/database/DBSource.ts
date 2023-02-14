import { GridFSBucket, MongoClient } from "mongodb";

import env from "../env";
const uri = "mongodb://127.0.0.1:27017";
export const client = new MongoClient(uri);
export const database = client.db(env.DATABASE_NAME);
export const gridFSBucket = new GridFSBucket(database);
