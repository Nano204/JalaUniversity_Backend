import { Rabbit } from "./rabbit-service/rabbit";

const propertiesExample1 = {
    msg: "Message must show",
    headers: {
        first: "test1",
        second: "test2",
    },
};
const propertiesExample2 = {
    msg: "Message must not show",
    headers: {
        first: "test1",
        second: "error",
    },
};

new Rabbit().publishOnExchange("HeaderExchangeTest", propertiesExample1);
new Rabbit().publishOnExchange("HeaderExchangeTest", propertiesExample2);
