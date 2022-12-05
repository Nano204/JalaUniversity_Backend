import Bootcamp from "./interfaces/bootcamp";
import container from "./config/ioc_config";
import SERVICE_IDENTIFIER from "./constants/identifiers";

// Composition root
const jalaBootcamp = container.get<Bootcamp>(SERVICE_IDENTIFIER.BOOTCAMP);

console.log(jalaBootcamp.schedule());
