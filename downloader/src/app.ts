import "reflect-metadata";
import { Rabbit } from "./services/rabbit-service/rabbit";
import { config as dotenvConfig } from "dotenv";
import { DBInit } from "./database/DBinit";
import env from "./env";
import api from "./api/api";

dotenvConfig();

const app = api;
const port = env.PORT || 3000;
export const rabbit = new Rabbit();

app.listen(port, () => {
    new DBInit().initializeDB().then(() => {
        console.log(`Downloader microservice listening on port ${port}`);
        rabbit.receiveFromRabbit();
    });
});
