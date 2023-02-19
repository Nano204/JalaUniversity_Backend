import { GridFSBucket, MongoClient } from "mongodb";

import env from "../env";
const uri = env.DATABASE_URI as string;
export const client = new MongoClient(uri);
export const database = client.db(env.DATABASE_NAME);
export const gridFSBucket = new GridFSBucket(database);
