import amqp from "amqplib";
import env from "../../env";
import AccountsReportService from "../AccountsReportService";
import FilesReportService from "../FilesReportService";

export const TOPICS = {
    fromDownloadCreateReport: "createReport.onStatsMicroservice",
    sendToDownloaderStoreReport: "storeReport.onDownloadMicroservice",
};

export type Payload = { topic: string; data: unknown };

export class Rabbit {
    private amqp;
    private amqpConnectionSetting;
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

        const fromDownloadCreateReport = await this.bindQueue(
            channel,
            TOPICS.fromDownloadCreateReport
        );

        console.log(
            " [*] Microservice: Stats - Waiting for messages in %s. To exit press CTRL+C",
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
        channel.consume(fromDownloadCreateReport, onMessage, { noAck: true });
    }

    selectCallbackFromQueue(payload: Payload): () => void {
        const topic = payload.topic;

        const returnReportsToDownload = async () => {
            const requestInfo = payload.data as string;
            console.log(" [x] Received %s", requestInfo ? "JSON data" : "null");
            const accountsReportService = new AccountsReportService();
            const filesReportService = new FilesReportService();
            const accountsReport =
                accountsReportService.createAccountsReport(requestInfo);
            const filesReport = filesReportService.createFilesReport(requestInfo);
            await this.publishOnExchange(
                TOPICS.sendToDownloaderStoreReport,
                JSON.stringify({ accountsReport, filesReport })
            );
            console.log("  -  Create report suscceded %s");
            console.log("--------------");
            console.log();
        };

        switch (topic) {
            case TOPICS.fromDownloadCreateReport:
                return returnReportsToDownload;
            default:
                return () => {
                    throw new Error("Not assigned queue");
                };
        }
    }
}
