/* eslint-disable @typescript-eslint/no-explicit-any */
import { Point } from "@influxdata/influxdb-client";
import amqp from "amqplib";
import { File } from "../../database/model/File";
import env from "../../env";
import FileService from "../../services/FileService";
import URIService, { CreateRelationRequest } from "../../services/URIService";
import AccountService from "../AccountService";
import InfluxDbService from "../influxDbService/InfluxDbService";
import ReportService from "../ReportService";

export const TOPICS = {
    fromUploadCreateFile: "createFile.onDownloadMicroservice",
    fromUploadDeleteFile: "deteleFile.onDownloadMicroservice",
    fromUploadUpdateFile: "updateFile.onDownloadMicroservice",
    fromUploadCreateAccount: "createAccount.onDownloadMicroservice",
    fromUploadDeleteAccount: "deteleAccount.onDownloadMicroservice",
    sendToStatsCreateReport: "createReport.onStatsMicroservice",
    fromStatsStoreReport: "storeReport.onDownloadMicroservice",
};

export type Payload = { topic: string; data: unknown };

export class Rabbit {
    private amqp;
    private amqpConnectionSetting;
    private uriService;
    private fileService;
    private accountService;
    private static exchange = "microservices_shared_exchange";
    constructor() {
        this.amqp = amqp;
        this.amqpConnectionSetting = {
            protocol: "amqp",
            hostname: "localhost",
            port: env.RABBIT_PORT,
            username: env.RABBIT_USERNAME,
            password: env.RABBIT_PASSWORD,
        };
        this.uriService = new URIService();
        this.fileService = new FileService();
        this.accountService = new AccountService();
    }

    async publishOnExchange(topic: string, data?: unknown) {
        const connection = await this.amqp.connect(this.amqpConnectionSetting);
        const channel = await connection.createChannel();
        const exchangeProperties = { durable: false };
        await channel.assertExchange(Rabbit.exchange, "topic", exchangeProperties);
        const payload = JSON.stringify({ topic, data });
        channel.publish(Rabbit.exchange, topic, Buffer.from(payload));
        console.log(" [x] Sent %s", topic);
        setTimeout(function () {
            connection.close();
        }, 500);
    }

    private async bindQueue(channel: amqp.Channel, topic: string) {
        const newQueue = await channel.assertQueue("", { exclusive: true });
        await channel.bindQueue(newQueue.queue, Rabbit.exchange, topic);
        return newQueue.queue;
    }

    async receiveFromRabbit() {
        const connection = await this.amqp.connect(this.amqpConnectionSetting);
        const channel = await connection.createChannel();
        const exchangeProperties = { durable: false };
        await channel.assertExchange(Rabbit.exchange, "topic", exchangeProperties);

        const fromUploadCreateFile = await this.bindQueue(
            channel,
            TOPICS.fromUploadCreateFile
        );
        const fromUploadDeleteFile = await this.bindQueue(
            channel,
            TOPICS.fromUploadDeleteFile
        );
        const fromUploadUpdateFile = await this.bindQueue(
            channel,
            TOPICS.fromUploadUpdateFile
        );
        const fromUploadCreateAccount = await this.bindQueue(
            channel,
            TOPICS.fromUploadCreateAccount
        );
        const fromUploadDeleteAccount = await this.bindQueue(
            channel,
            TOPICS.fromUploadDeleteAccount
        );
        const fromStatsStoreReport = await this.bindQueue(
            channel,
            TOPICS.fromStatsStoreReport
        );
        console.log(
            " [*] Microservice: Downloader - Waiting for messages in %s. To exit press CTRL+C",
            Rabbit.exchange
        );

        const onMessage = (payloadMsg: amqp.ConsumeMessage | null) => {
            if (!payloadMsg) {
                throw new Error("Error");
            }
            const payload = JSON.parse(payloadMsg.content.toString());
            console.log(" [x] Received | Topic:", payload.topic);
            const cb = this.selectCallbackFromQueue(payload);
            cb();
        };

        channel.consume(fromUploadDeleteAccount, onMessage, { noAck: true });
        channel.consume(fromUploadCreateFile, onMessage, { noAck: true });
        channel.consume(fromUploadDeleteFile, onMessage, { noAck: true });
        channel.consume(fromUploadUpdateFile, onMessage, { noAck: true });
        channel.consume(fromUploadCreateAccount, onMessage, { noAck: true });
        channel.consume(fromStatsStoreReport, onMessage, { noAck: true });
    }

    sendSignals(report: ReturnType<JSON["parse"]>) {
        const accountsReport = report.accountsReport;
        const filesReport = report.filesReport;
        const pointsArray: Point[] = [];
        accountsReport.length &&
            accountsReport.forEach((account: any) => {
                const point = new Point("account_use")
                    .tag("account", account.accountId)
                    .tag("status", account.accountStatus)
                    .intField("totalDownloadSize", account.totalDownloadSize)
                    .intField("downloadUsages", account.downloadUsages)
                    .timestamp(new Date());
                pointsArray.push(point);
            });
        filesReport.length &&
            filesReport.forEach((file: any) => {
                const point = new Point("file_use")
                    .tag("file", file.fileId)
                    .tag("status", file.fileStatus)
                    .stringField("name", file.fileName)
                    .stringField("mimeType", file.mimeType)
                    .stringField("onDriveId", file.onDriveId)
                    .intField("size", file.size)
                    .intField("totalDownloadSize", file.totalDownloadSize)
                    .intField("timesDownloaded", file.totalDownloadTimes)
                    .timestamp(new Date());
                pointsArray.push(point);
            });
        const influxDbService = new InfluxDbService();
        influxDbService.writeApi.writePoints(pointsArray);
    }

    selectCallbackFromQueue(payload: Payload): () => void {
        const topic = payload.topic;

        const executeFileCreateRequest = async () => {
            const requestInfo = payload.data as CreateRelationRequest;
            console.log(" [x] Received %s", requestInfo.fileId, requestInfo.accountId);
            await this.uriService.createNew(requestInfo);
            console.log("  -  Create request suscceded %s");
            console.log("--------------");
            console.log();
        };

        const executeFileDeleteRequest = async () => {
            const id = payload.data as string;
            console.log(" [x] Received %s", id);
            await this.fileService.deleteById(id);
            console.log("  -  Delete request suscceded %s");
            console.log("--------------");
            console.log();
        };

        const executeFileUpdateRequest = async () => {
            const requestInfo = payload.data as File;
            console.log(" [x] Received %s", requestInfo);
            const file = await this.fileService.findById(requestInfo.id);
            if (file) {
                await this.fileService.update({ ...file, ...requestInfo });
            }
            console.log("  -  Update request suscceded %s");
            console.log("--------------");
            console.log();
        };

        const executeAccountDeleteRequest = async () => {
            const id = payload.data as string;
            console.log(" [x] Received %s", id);
            await this.accountService.deleteById(id);
            console.log("  -  Delete request suscceded %s");
            console.log("--------------");
            console.log();
        };

        const executeStoreReports = async () => {
            const reports = JSON.parse(payload.data as string);
            this.sendSignals(reports);
            const accountsReport = JSON.stringify(reports.accountsReport);
            const filesReport = JSON.stringify(reports.filesReport);
            console.log(" [x] Received %s", "JSON Reports");
            const reportService = new ReportService();
            await reportService.updateOrCreateByType("accounts", accountsReport);
            await reportService.updateOrCreateByType("files", filesReport);
            console.log("  -  Store reports suscceded %s");
            console.log("--------------");
            console.log();
        };

        switch (topic) {
            case TOPICS.fromUploadCreateFile:
                return executeFileCreateRequest;
            case TOPICS.fromUploadDeleteFile:
                return executeFileDeleteRequest;
            case TOPICS.fromUploadUpdateFile:
                return executeFileUpdateRequest;
            case TOPICS.fromUploadDeleteAccount:
                return executeAccountDeleteRequest;
            case TOPICS.fromStatsStoreReport:
                return executeStoreReports;
            default:
                return () => {
                    throw new Error("Not assigned queue");
                };
        }
    }
}
