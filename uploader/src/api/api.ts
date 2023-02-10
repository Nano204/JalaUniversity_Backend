import express from "express";
const api = express();
import accountRouter from "./accounts/AccountRoutes";
import fileRouter from "./files/FileRoutes";
import ErrorHandlersMiddleWare from "./errorHandler/ErrorHandlerMw";

const errorHandler = new ErrorHandlersMiddleWare();

api.use(express.json());
api.use("/accounts", accountRouter);
api.use("/files", fileRouter);
api.use(errorHandler.logErrors);
api.use(errorHandler.serverErrorHandler);
api.use(errorHandler.errorHandler);

api.get("/", (req, res) => {
    res.send("The server is mounted");
});

export default api;
