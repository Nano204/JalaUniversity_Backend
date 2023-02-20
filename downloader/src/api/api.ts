import express from "express";
const api = express();
import accountInfoRouter from "./accounts/AccountRoutes";
import fileRouter from "./files/FileRoutes";
import uriRelationsRouter from "./URIRelations/URIRelactionsRoutes";
import downloadInfoRouter from "./downloadInfo/DownloadInfoRoutes";
import ErrorHandlersMiddleWare from "./errorHandler/ErrorHandlerMw";

const errorHandler = new ErrorHandlersMiddleWare();

api.use(express.json());
api.use("/accounts", accountInfoRouter);
api.use("/files", fileRouter);
api.use("/downloads", uriRelationsRouter);
api.use("/registries", downloadInfoRouter);
api.use(errorHandler.logErrors);
api.use(errorHandler.serverErrorHandler);
api.use(errorHandler.errorHandler);

api.get("/", (req, res) => {
    res.send("The server is mounted");
});

export default api;
