import { Rabbit } from "./rabbit-service/rabbit";

const propertiesExample1 = {
    msg: "Message must be received in both cases",
    headers: {
        first: "test1",
        second: "test2",
    },
};
const propertiesExample2 = {
    msg: "Message must be received in just in any case",
    headers: {
        first: "test1",
        second: "error",
    },
};

setInterval(() => {
    new Rabbit().publishOnExchange("HeaderExchangeTest", propertiesExample1);
    new Rabbit().publishOnExchange("HeaderExchangeTest", propertiesExample2);
}, 500);
