import { config as dotenvConfig } from "dotenv";
dotenvConfig();

export default {
    PORT: process.env.PORT,
    RABBIT_PORT: process.env.RABBIT_PORT,
    RABBIT_USERNAME: process.env.RABBIT_USERNAME,
    RABBIT_PASSWORD: process.env.RABBIT_PASSWORD,
};