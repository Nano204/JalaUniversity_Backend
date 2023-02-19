import env from "../../env";
import amqp from "amqplib";
import FileService from "../FileService";

export const QUEUES = {
    uploadQueue: "Upload-to-drive",
    executeUploadTask: "Excute-task-on-upload-queue",
    sendToDownloadService: "Upload-download-connection",
};

export class Rabbit {
    private amqp;
    private amqpConnectionSetting;
    private static executionQueue: Array<() => void> = [];
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

    async receiveFromQueue(queueName: string) {
        const connection = await this.amqp.connect(this.amqpConnectionSetting);
        const channel = await connection.createChannel();
        const queueProperties = { durable: false };
        await channel.assertQueue(queueName, queueProperties);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName);
        const onMessage = (msg: amqp.ConsumeMessage | null) => {
            const payload = msg && msg.content.toString();
            console.log("Callback - ", queueName);
            console.log(" [x] Received %s", payload);
            const cb = this.selectCallbackFromQueue(queueName, payload);
            cb();
            console.log("--------------");
            console.log();
        };
        channel.consume(queueName, onMessage, { noAck: true });
    }

    selectCallbackFromQueue(queueName: string, payload: string | null): () => void {
        switch (queueName) {
            case QUEUES.uploadQueue:
                return (): void => {
                    const fileService = new FileService();
                    const execution = () => fileService.fromGridFSToAllDrives(payload as string);
                    Rabbit.executionQueue.push(execution);
                    console.log("Add function - ", Rabbit.executionQueue.length);
                    if (Rabbit.executionQueue.length == 1) {
                        Rabbit.executionQueue[0]();
                    }
                };
            case QUEUES.executeUploadTask:
                return () => {
                    console.log("Excute function - ", Rabbit.executionQueue.length);
                    Rabbit.executionQueue.shift();
                    if (Rabbit.executionQueue.length) {
                        Rabbit.executionQueue[0]();
                    }
                };
            default:
                return () => {
                    throw new Error("Not assigned queue");
                };
        }
    }
}
