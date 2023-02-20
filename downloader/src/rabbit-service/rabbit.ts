/* eslint-disable @typescript-eslint/no-explicit-any */
import amqp from "amqplib";
import env from "../env";
import FileService from "../services/FileService";
import URIService, { CreateRelationRequest } from "../services/URIService";

export const QUEUES = {
    receiveFromUploadService: "Upload-download-connection",
};

export const TOPICS = {
    fromUploadCreate: "createFile.onDownloadMicroservice",
    fromUploadDelete: "deteleFile.onDownloadMicroservice",
    fromUploadUpdate: "updateFile.onDownloadMicroservice",
};

export type Payload = { topic: string; data: unknown };

export class Rabbit {
    private amqp;
    private amqpConnectionSetting;
    private uriService;
    private fileService;
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
    }

    async sendToQueue(queueName: string, msg: string) {
        const connection = await this.amqp.connect(this.amqpConnectionSetting);
        const channel = await connection.createChannel();
        const queueProperties = { durable: false };
        await channel.assertQueue(queueName, queueProperties);
        channel.sendToQueue(queueName, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
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

        const fromUploadCreate = await this.bindQueue(channel, TOPICS.fromUploadCreate);
        const fromUploadDelete = await this.bindQueue(channel, TOPICS.fromUploadDelete);
        const fromUploadUpdate = await this.bindQueue(channel, TOPICS.fromUploadUpdate);

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
            console.log("--------------");
            console.log();
        };

        channel.consume(fromUploadCreate, onMessage, { noAck: true });
        channel.consume(fromUploadDelete, onMessage, { noAck: true });
        channel.consume(fromUploadUpdate, onMessage, { noAck: true });
    }

    selectCallbackFromQueue(payload: Payload): () => void {
        const topic = payload.topic;

        const executeFileCreateRequest = () => {
            const requestInfo = payload.data as CreateRelationRequest;
            console.log(" [x] Received %s", requestInfo.fileId, requestInfo.accountId);
            this.uriService.createNew(requestInfo);
        };

        // const executeFileDeleteRequest = async () => {
        //     const id = payload.data as string;
        //     console.log(" [x] Received %s", id);
        //     const file = await this.fileService.findByOriginId(id);
        //     if (file) {
        //         await this.fileService.deleteById(file.id);
        //     }
        // };

        // const executeFileUpdateRequest = () => {
        //     const requestInfo = payload.data as CreateRelationRequest;
        //     console.log(
        //         " [x] Received %s",
        //         requestInfo.accountOriginId,
        //         requestInfo.fileOriginId
        //     );
        //     this.uriService.createRelation(requestInfo);
        // };

        switch (topic) {
            case TOPICS.fromUploadCreate:
                return executeFileCreateRequest;
            // case TOPICS.fromUploadDelete:
            //     return executeFileDeleteRequest;
            default:
                return () => {
                    throw new Error("Not assigned queue");
                };
        }
    }
}
