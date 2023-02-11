import { GridFSBucket, MongoClient } from "mongodb";
const uri = "mongodb://127.0.0.1:27017";
export const client = new MongoClient(uri);
export const database = client.db("uploader");
export const gridFSBucket = new GridFSBucket(database);
