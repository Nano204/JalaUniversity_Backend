import { Rabbit } from "./rabbit-service/rabbit";

new Rabbit().receiveFromQueue("HeaderExchangeTest");
