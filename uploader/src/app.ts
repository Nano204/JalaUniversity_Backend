import { QUEUES, Rabbit } from "./services/rabbitService/rabbit";
import { config as dotenvConfig } from "dotenv";
import api from "./api/api";
import env from "./env";

dotenvConfig();

const app = api;
const port = env.PORT || 3000;
export const rabbit = new Rabbit();

app.listen(port, () => {
    console.log(`Uploading microservice listening on port ${port}`);
    rabbit.receiveFromQueue(QUEUES.uploadQueue);
    rabbit.receiveFromQueue(QUEUES.executeUploadTask);
});
