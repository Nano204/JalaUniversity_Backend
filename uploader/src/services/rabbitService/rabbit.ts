import env from "../../env";
import amqp from "amqplib";
import { OnDriveService } from "../OnDriveService";
import { AccountEntity } from "../../database/model/Account";

export const TOPICS = {
    toUploadFileCreate: "create.file.toQueue",
    toUploadFileDelete: "delete.file.toQueue",
    toUploadUpdate: "update.file.toQueue",
    toUploadAccountCreate: "create.account.toQueue",
    toUploadAccountDelete: "delete.account.toQueue",
    toExecuteOnQueue: "execute.queue",
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
    private static state: "busy" | "awaiting" = "awaiting";
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

        const toUploadFileCreate = await this.bindQueue(
            channel,
            TOPICS.toUploadFileCreate
        );
        const toUploadAccountCreate = await this.bindQueue(
            channel,
            TOPICS.toUploadAccountCreate
        );
        const toUploadFileDelete = await this.bindQueue(
            channel,
            TOPICS.toUploadFileDelete
        );
        const toUploadAccountDelete = await this.bindQueue(
            channel,
            TOPICS.toUploadAccountDelete
        );
        const toUploadUpdate = await this.bindQueue(channel, TOPICS.toUploadUpdate);
        const toExecuteOnQueue = await this.bindQueue(channel, TOPICS.toExecuteOnQueue);

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

        channel.consume(toUploadFileCreate, onMessage, { noAck: true });
        channel.consume(toUploadAccountCreate, onMessage, { noAck: true });
        channel.consume(toUploadFileDelete, onMessage, { noAck: true });
        channel.consume(toUploadAccountDelete, onMessage, { noAck: true });
        channel.consume(toUploadUpdate, onMessage, { noAck: true });
        channel.consume(toExecuteOnQueue, onMessage, { noAck: true });
    }

    selectCallbackFromQueue(payload: Payload): () => void {
        const topic = payload.topic;
        const onPushArrive = () => {
            console.log(Rabbit.state, Rabbit.executionQueue.length);
            if (Rabbit.state == "awaiting" && Rabbit.executionQueue.length >= 1) {
                Rabbit.state = "busy";
                const task = Rabbit.executionQueue.shift() as () => void;
                console.log(task);
                task();
            }
        };

        const pushOnUploadToQueue = () => {
            const data = payload.data as string;
            const onDriveService = new OnDriveService();
            const uploadToAllDrives = async () =>
                await onDriveService.uploadFileToAllDrives(data);
            Rabbit.executionQueue.push(uploadToAllDrives);
            onPushArrive();
        };

        const pushOnCreateAccountToQueue = () => {
            const data = payload.data as string;
            const onDriveService = new OnDriveService();
            const uploadAllFiles = async () =>
                await onDriveService.allFilesfromGridFSToDrive(data);
            Rabbit.executionQueue.push(uploadAllFiles);
            onPushArrive();
        };

        const pushOnClearAccountToQueue = () => {
            const account = payload.data as AccountEntity;
            const onDriveService = new OnDriveService();
            const deleteAllFiles = async () => {
                await onDriveService.deleteAllFilesFromDriveAccount(account);
            };
            Rabbit.executionQueue.push(deleteAllFiles);
            onPushArrive();
        };

        const executeNextTask = () => {
            console.log("Execute function - ", Rabbit.executionQueue.length);
            if (Rabbit.executionQueue.length) {
                const task = Rabbit.executionQueue.shift() as () => void;
                task();
                console.log(task.name, "-----------", Rabbit.executionQueue.length);
            } else {
                Rabbit.state = "awaiting";
                console.log("Awaiting...");
            }
        };

        switch (topic) {
            case TOPICS.toUploadFileCreate:
                return pushOnUploadToQueue;
            case TOPICS.toUploadAccountCreate:
                return pushOnCreateAccountToQueue;
            case TOPICS.toUploadAccountDelete:
                return pushOnClearAccountToQueue;
            case TOPICS.toExecuteOnQueue:
                return executeNextTask;
            default:
                return () => {
                    throw new Error("Not assigned queue");
                };
        }
    }
}
