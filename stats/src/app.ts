import express, { Request, Response } from "express";
import { config as dotenvConfig } from "dotenv";
import { Rabbit } from "./rabbit-service/rabbit";

dotenvConfig();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Stats microservice listening on port ${port}`);
    new Rabbit().sendToQueue("Test", "Test message 1");
    new Rabbit().sendToQueue("Test", "Test message 2");
    new Rabbit().sendToQueue("Test", "Test message 3");
    new Rabbit().sendToQueue("Test", "Test message 4");
    new Rabbit().sendToQueue("Test", "Test message 5");
    new Rabbit().receiveFromQueue("Test");
});
