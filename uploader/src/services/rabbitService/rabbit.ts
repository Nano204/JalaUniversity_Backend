import env from "../../env";
import amqp from "amqplib";

export class Rabbit {
    private amqp;
    private amqpConnectionSetting;
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
            process.exit(0);
        }, 500);
    }

    async receiveFromQueue(queueName: string) {
        const connection = await this.amqp.connect(this.amqpConnectionSetting);
        const channel = await connection.createChannel();
        const queueProperties = { durable: false };
        await channel.assertQueue(queueName, queueProperties);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queueName);
        const onMessage = (msg: amqp.ConsumeMessage | null) => {
            msg && console.log(" [x] Received %s", msg.content.toString());
        };
        channel.consume(queueName, onMessage, { noAck: true });
        setTimeout(function () {
            connection.close();
            process.exit(0);
        }, 500);
    }
}
