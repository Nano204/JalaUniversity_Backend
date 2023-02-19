/* eslint-disable @typescript-eslint/no-explicit-any */
import amqp from "amqplib";
import env from "../env";
import URIService from "../services/URIService";

export const QUEUES = {
    receiveFromUploadService: "Upload-download-connection",
};
export class Rabbit {
    private amqp;
    private amqpConnectionSetting;
    private uriService;
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
            const cb = this.selectCallbackFromQueue(queueName, payload);
            cb();
            console.log("--------------");
            console.log();
        };
        channel.consume(queueName, onMessage, { noAck: true });
    }

    selectCallbackFromQueue(queueName: string, payload: any): () => void {
        switch (queueName) {
            case QUEUES.receiveFromUploadService:
                return (): void => {
                    const requestInfo = JSON.parse(payload);
                    console.log(
                        " [x] Received %s",
                        requestInfo.accountOriginId,
                        requestInfo.fileOriginId
                    );
                    this.uriService.createRelation(requestInfo);
                };
            default:
                return () => {
                    throw new Error("Not assigned queue");
                };
        }
    }
}
