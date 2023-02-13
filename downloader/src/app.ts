import { config as dotenvConfig } from "dotenv";
import env from "./env";
import { DBInit } from "./database/DBinit";
import api from "./api/api";

dotenvConfig();

const app = api;
const port = env.PORT || 3000;

app.listen(port, () => {
    new DBInit()
        .initializeDB()
        .then(() => console.log(`Downloader microservice listening on port ${port}`));
});
