import env from "./env";
import express, { Request, Response } from "express";
import { DBInit } from "./database/DBinit";
import { Rabbit } from "./rabbit-service/rabbit";

const app = express();
const port = env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    new DBInit()
        .initializeDB()
        .then(() => console.log(`Downloader microservice listening on port ${port}`));
    new Rabbit().sendToQueue("Queue1", "Msq1");
    new Rabbit().sendToQueue("Queue1", "Msq2");
    new Rabbit().sendToQueue("Queue1", "Msq3");
    new Rabbit().sendToQueue("Queue1", "Msq4");
    new Rabbit().sendToQueue("Queue1", "Msq5");
    new Rabbit().receiveFromQueue("Queue1");
});
