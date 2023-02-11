import { config as dotenvConfig } from "dotenv";
import api from "./api/api";
import env from "./env";

dotenvConfig();

const app = api;
const port = env.PORT || 3000;

app.listen(port, () => {
    console.log(`Uploading microservice listening on port ${port}`);
});
