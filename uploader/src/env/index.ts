import { config as dotenvConfig } from "dotenv";
dotenvConfig();

export default {
    PORT: process.env.PORT,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    RABBIT_PORT: Number(process.env.RABBIT_PORT),
    RABBIT_USERNAME: process.env.RABBIT_USERNAME,
    RABBIT_PASSWORD: process.env.RABBIT_PASSWORD,
    GOOGLEAPI_CLIENT_ID: process.env.GOOGLEAPI_CLIENT_ID,
    GOOGLEAPI_CLIENT_SECRET: process.env.GOOGLEAPI_CLIENT_SECRET,
    GOOGLEAPI_REDIRECT_URI: process.env.GOOGLEAPI_REDIRECT_URI,
};
