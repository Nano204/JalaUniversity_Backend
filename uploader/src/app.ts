import { config as dotenvConfig } from "dotenv";
import express, { Request, Response } from "express";
import { DBInit } from "./database/DBinit";
import env from "./env";
import { Rabbit } from "./rabbit-service/rabbit";

dotenvConfig();

const app = express();
const port = env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    new DBInit()
        .initializeDB()
        .then(() => console.log(`Uploading microservice listening on port ${port}`));
    new Rabbit().sendToQueue("Hello", "Hello world1");
    new Rabbit().sendToQueue("Hello", "Hello world2");
    new Rabbit().sendToQueue("Hello", "Hello world3");
    new Rabbit().sendToQueue("Hello", "Hello world4");
    new Rabbit().receiveFromQueue("Hello");
});
