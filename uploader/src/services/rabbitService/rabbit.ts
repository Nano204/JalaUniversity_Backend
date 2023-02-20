import env from "../../env";
import amqp from "amqplib";
import FileService from "../FileService";

export const TOPICS = {
    toUploadCreate: "create.toQueue",
    toUploadDelete: "delete.toQueue",
    toUploadUpdate: "update.toQueue",
    toExecuteCreate: "create.execute",
    toExecuteDelete: "delete.execute",
    toExecuteUpdate: "update.execute",
    sendToDownloadCreateFile: "createFile.onDownloadMicroservice",
    sendToDownloadDeleteFile: "deteleFile.onDownloadMicroservice",
    sendToDownloadUpdateFile: "updateFile.onDownloadMicroservice",
    sendToDownloadCreateAccount: "createAccount.onDownloadMicroservice",
    sendToDownloadDeleteAccount: "deteleAccount.onDownloadMicroservice",
};

export type Payload = { topic: string; data: unknown };

export class Rabbit {
    private amqp;
    private amqpConnectionSetting;
    private static executionQueue: Array<() => void> = [];
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

        const toUploadCreate = await this.bindQueue(channel, TOPICS.toUploadCreate);
        const toUploadDelete = await this.bindQueue(channel, TOPICS.toUploadDelete);
        const toUploadUpdate = await this.bindQueue(channel, TOPICS.toUploadUpdate);
        const toExcecuteCreate = await this.bindQueue(channel, TOPICS.toExecuteCreate);
        const toExcecuteDelete = await this.bindQueue(channel, TOPICS.toExecuteDelete);
        const toExcecuteUpdate = await this.bindQueue(channel, TOPICS.toExecuteUpdate);

        console.log(
            " [*] Microservice: Uploader - Waiting for messages in %s. To exit press CTRL+C",
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

        channel.consume(toUploadCreate, onMessage, { noAck: true });
        channel.consume(toUploadDelete, onMessage, { noAck: true });
        channel.consume(toUploadUpdate, onMessage, { noAck: true });
        channel.consume(toExcecuteCreate, onMessage, { noAck: true });
        channel.consume(toExcecuteDelete, onMessage, { noAck: true });
        channel.consume(toExcecuteUpdate, onMessage, { noAck: true });
    }

    selectCallbackFromQueue(payload: Payload): () => void {
        const topic = payload.topic;

        const pushOnUploadQueue = () => {
            const data = payload.data as string;
            const fileService = new FileService();
            const execution = () => fileService.fromGridFSToAllDrives(data);
            Rabbit.executionQueue.push(execution);
            console.log("Add function - ", Rabbit.executionQueue.length);
            if (Rabbit.executionQueue.length == 1) {
                Rabbit.executionQueue[0]();
            }
        };

        const executeNextUploadTask = () => {
            console.log("Execute function - ", Rabbit.executionQueue.length);
            Rabbit.executionQueue.shift();
            if (Rabbit.executionQueue.length) {
                Rabbit.executionQueue[0]();
            }
        };

        switch (topic) {
            case TOPICS.toUploadCreate:
                return pushOnUploadQueue;
            case TOPICS.toExecuteCreate:
                return executeNextUploadTask;
            default:
                return () => {
                    throw new Error("Not assigned queue");
                };
        }
    }
}
