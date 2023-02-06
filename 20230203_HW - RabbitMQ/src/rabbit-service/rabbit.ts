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

    publishOnExchange(exchange: string, properties: any) {
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
                    channel.assertExchange(exchange, "headers", {
                        durable: false,
                    });
                    const headers = properties.headers;
                    channel.publish(exchange, "", Buffer.from(properties.msg), {
                        headers,
                    });
                    console.log(" [x] Sent %s", properties.msg);
                });

                setTimeout(function () {
                    connection.close();
                    process.exit(0);
                }, 500);
            }
        );
    }

    receiveFromQueue(exchange: string) {
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
                    channel.assertExchange(exchange, "headers", {
                        durable: false,
                    });

                    channel.assertQueue(
                        "",
                        {
                            exclusive: true,
                        },
                        function (error2: Error, q: any) {
                            if (error2) {
                                throw error2;
                            }
                            console.log(
                                " [*] Waiting for messages in %s. To exit press CTRL+C",
                                q.queue
                            );
                            const headers = {
                                first: "test1",
                                second: "test2",
                                "x-match": "all",
                            };
                            channel.bindQueue(q.queue, exchange, "", headers);

                            channel.consume(
                                q.queue,
                                function (msg: any) {
                                    if (msg.content) {
                                        console.log(" [x] %s", msg.content.toString());
                                    }
                                },
                                {
                                    noAck: true,
                                }
                            );
                        }
                    );
                });
            }
        );
    }
}
