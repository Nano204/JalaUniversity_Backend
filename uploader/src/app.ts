import { config as dotenvConfig } from "dotenv";
import api from "./api/api";
import { DBInit } from "./database/DBinit";
import env from "./env";

dotenvConfig();

const app = api;
const port = env.PORT || 3000;

app.listen(port, () => {
    new DBInit()
        .initializeDB()
        .then(() => console.log(`Uploading microservice listening on port ${port}`));
});