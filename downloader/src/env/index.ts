import { config as dotenvConfig } from "dotenv";
dotenvConfig();

export default {
    PORT: process.env.PORT,
    DATABASE_NAME: process.env.DATABASE_NAME,
    RABBIT_PORT: Number(process.env.RABBIT_PORT),
    RABBIT_USERNAME: process.env.RABBIT_USERNAME,
    RABBIT_PASSWORD: process.env.RABBIT_PASSWORD,
    INFLUXDB_TOKEN: process.env.INFLUXDB_TOKEN,
    INFLUXDB_URL: process.env.INFLUXDB_URL,
    INFLUXDB_ORG: process.env.INFLUXDB_ORG,
    INFLUXDB_BUCKET: process.env.INFLUXDB_BUCKET,
};
