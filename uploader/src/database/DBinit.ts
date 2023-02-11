import { ObjectId } from "mongodb";
import { Db } from "typeorm";
import { AppDataSource, client } from "./DBSource";

export class DBInit {
    // async initializeDB(): Promise<void> {
    //     await AppDataSource.initialize();
    //     const query = AppDataSource.driver.createQueryRunner("master");
    //     const db = query.query("uploader.fs.files.find()");
    //     console.log(db);
    // }

    async initializeDB(): Promise<void> {
        // const database = client.db("uploader");
        // const files = database.collection("fs.files");
        // const chunks = database.collection("fs.chunks");
        // const query = { contentType: "image/png" };
        // const query2 = { files_id: new ObjectId("63e6b4ac26ca0e844996e214") };
        // console.log(await files.find().toArray());
        // console.log(await chunks.findOne(query2));
        // await AppDataSource.initialize();
        // const query = AppDataSource.driver.createQueryRunner("master");
        // const db = query.query("uploader.fs.files.find()");
        // console.log(db);
    }
}
