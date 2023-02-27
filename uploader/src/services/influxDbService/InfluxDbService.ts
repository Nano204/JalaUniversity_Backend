import { InfluxDB, WriteApi } from "@influxdata/influxdb-client";
import { hostname } from "os";
import env from "../../env";

const url = env.INFLUXDB_URL as string;
const token = env.INFLUXDB_TOKEN as string;
const org = env.INFLUXDB_ORG as string;
const bucket = env.INFLUXDB_BUCKET as string;

export default class InfluxDbService {
    public writeApi: WriteApi;

    constructor() {
        this.writeApi = new InfluxDB({ url, token })
            .getWriteApi(org, bucket, "ns")
            .useDefaultTags({ location: hostname() });
    }
}
