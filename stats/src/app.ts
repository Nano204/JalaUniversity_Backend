import express from "express";
import { config as dotenvConfig } from "dotenv";
import { Rabbit } from "./services/rabbit-service/rabbit";

dotenvConfig();

const app = express();
const port = process.env.PORT || 3000;
export const rabbit = new Rabbit();

app.listen(port, () => {
    console.log(`Stats microservice listening on port ${port}`);
    rabbit.receiveFromRabbit();
});
