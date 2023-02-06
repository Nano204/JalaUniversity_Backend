import env from "../env";

export class Rabbit {
    private amqp;
    private amqpConnectionSetting;
    constructor() {
        this.amqp = require("amqplib/callback_api");
        this.amqpConnectionSetting = {
            protocol: "amqp",
            hostname: "localhost",
            port: env.RABBIT_PORT,
            username: env.RABBIT_USERNAME,
            password: env.RABBIT_PASSWORD,
        };
    }

    sendToQueue(queue: string, msg: string) {
        this.amqp.connect(
            this.amqpConnectionSetting,
            function (error0: Error, connection: any) {
                if (error0) {
                    throw error0;
                }
                connection.createChannel(function (error1: Error, channel: any) {
                    if (error1) {
                        throw error1;
                    }
                    channel.assertQueue(queue, {
                        durable: false,
                    });
                    channel.sendToQueue(queue, Buffer.from(msg));
                    console.log(" [x] Sent %s", msg);
                });
                setTimeout(function () {
                    connection.close();
                    process.exit(0);
                }, 500);
            }
        );
    }

    receiveFromQueue(queue: string) {
        this.amqp.connect(
            this.amqpConnectionSetting,
            function (error0: Error, connection: any) {
                if (error0) {
                    throw error0;
                }
                connection.createChannel(function (error1: Error, channel: any) {
                    if (error1) {
                        throw error1;
                    }
                    channel.assertQueue(queue, {
                        durable: false,
                    });
                    console.log(
                        " [*] Waiting for messages in %s. To exit press CTRL+C",
                        queue
                    );
                    channel.consume(
                        queue,
                        function (msg: { content: object }) {
                            console.log(" [x] Received %s", msg.content.toString());
                        },
                        {
                            noAck: true,
                        }
                    );
                });
                setTimeout(function () {
                    connection.close();
                    process.exit(0);
                }, 500);
            }
        );
    }
}
